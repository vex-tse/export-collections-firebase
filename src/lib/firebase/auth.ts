
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import {
  collection,
  getDocsFromServer,
  query,
  where,
  limit,
} from "firebase/firestore";

import { getFirebaseAuth, getFirebaseFirestore } from "./config";

const validRoles = new Set(["admin", "editor", "viewer"]);
const authorizationErrors = new Set([
  "EMAIL_MISSING",
  "EMAIL_UNVERIFIED",
  "USER_NOT_ALLOWED",
  "DUPLICATE_ALLOWUSER_RECORD",
  "USER_DISABLED",
  "INVALID_ROLE",
]);
const popupCancellationErrors = new Set([
  "auth/popup-closed-by-user",
  "auth/cancelled-popup-request",
]);
const networkErrors = new Set([
  "auth/network-request-failed",
  "firestore/deadline-exceeded",
  "firestore/unavailable",
  "deadline-exceeded",
  "unavailable",
]);

export type AuthFailureReason =
  | "unauthorized"
  | "cancelled"
  | "verification-failed"
  | "sign-in-failed";

export type AuthNoticeReason = AuthFailureReason | "configuration-missing";

export function isAuthNoticeReason(value: string | null): value is AuthNoticeReason {
  return (
    value === "unauthorized" ||
    value === "cancelled" ||
    value === "verification-failed" ||
    value === "sign-in-failed" ||
    value === "configuration-missing"
  );
}

export function getAuthFailureReason(
  error: unknown,
  context: "authorization" | "sign-in" = "sign-in",
): AuthFailureReason {
  if (error instanceof Error && authorizationErrors.has(error.message)) {
    return "unauthorized";
  }

  if (error instanceof Error && error.message === "FIRESTORE_ACCESS_ERROR") {
    return "verification-failed";
  }

  if (error instanceof FirebaseError) {
    if (popupCancellationErrors.has(error.code)) {
      return "cancelled";
    }

    if (networkErrors.has(error.code)) {
      return "verification-failed";
    }
  }

  return context === "authorization" ? "verification-failed" : "sign-in-failed";
}

export async function authorizeGoogleUser(user: User) {
  if (!user.email) {
    throw new Error("EMAIL_MISSING");
  }

  if (!user.emailVerified) {
    throw new Error("EMAIL_UNVERIFIED");
  }

  const usersRef = collection(getFirebaseFirestore(), "allowusers");
  const userQuery = query(
    usersRef,
    where("uid", "==", user.uid),
    limit(2),
  );

  let snapshot;

  try {
    snapshot = await getDocsFromServer(userQuery);
  } catch (error) {
    console.error("No se pudo consultar allowusers.", error);
    throw new Error("FIRESTORE_ACCESS_ERROR");
  }

  if (snapshot.empty) {
    throw new Error("USER_NOT_ALLOWED");
  }

  if (snapshot.size !== 1) {
    throw new Error("DUPLICATE_ALLOWUSER_RECORD");
  }

  const userData = snapshot.docs[0].data();

  if (userData.active !== true) {
    throw new Error("USER_DISABLED");
  }

  const role = userData.role;

  if (typeof role !== "string" || !validRoles.has(role)) {
    throw new Error("INVALID_ROLE");
  }

  return {
    uid: user.uid,
    email: user.email,
    role,
    authorized: true,
  };
}

export async function loginWithGoogle() {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    return await authorizeGoogleUser(result.user);
  } catch (error) {
    if (auth.currentUser) {
      await signOut(auth);
    }
    throw error;
  }
}

export async function logout() {
  const auth = getFirebaseAuth();
  if (auth.currentUser) {
    await signOut(auth);
  }
}
