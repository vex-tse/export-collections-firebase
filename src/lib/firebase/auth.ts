
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

import {
  collection,
  getDocsFromServer,
  query,
  where,
  limit,
} from "firebase/firestore";

import { auth, db } from "./config";

const validRoles = new Set(["admin", "editor", "viewer"]);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function authorizeGoogleUser(user: User) {
  if (!user.email) {
    throw new Error("EMAIL_MISSING");
  }

  if (!user.emailVerified) {
    throw new Error("EMAIL_UNVERIFIED");
  }

  const normalizedEmail = normalizeEmail(user.email);
  const usersRef = collection(db, "allowusers");
  const userQuery = query(
    usersRef,
    where("email", "==", normalizedEmail),
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
    email: normalizedEmail,
    role,
    authorized: true,
  };
}

export async function ensureAuthorizedGoogleSession(user: User | null) {
  if (!user) {
    return null;
  }

  return await authorizeGoogleUser(user);
}

export async function loginWithGoogle() {
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
  if (auth.currentUser) {
    await signOut(auth);
  }
}
