import { getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

export class FirebaseConfigError extends Error {
  constructor(public readonly variable: string) {
    super(`Falta configurar ${variable} en el archivo .env.`);
    this.name = "FirebaseConfigError";
  }
}

function getRequiredEnvironmentVariable(name: string, value: string | undefined): string {
  if (!value?.trim()) {
    throw new FirebaseConfigError(name);
  }

  return value.trim();
}

let firebaseApp: FirebaseApp | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) {
    return firebaseApp;
  }

  const options: FirebaseOptions = {
    apiKey: getRequiredEnvironmentVariable(
      "PUBLIC_FIREBASE_API_KEY",
      import.meta.env.PUBLIC_FIREBASE_API_KEY,
    ),
    authDomain: getRequiredEnvironmentVariable(
      "PUBLIC_FIREBASE_AUTH_DOMAIN",
      import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    ),
    projectId: getRequiredEnvironmentVariable(
      "PUBLIC_FIREBASE_PROJECT_ID",
      import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    ),
    appId: getRequiredEnvironmentVariable(
      "PUBLIC_FIREBASE_APP_ID",
      import.meta.env.PUBLIC_FIREBASE_APP_ID,
    ),
  };

  firebaseApp =
    getApps().find((app) => app.name === "[DEFAULT]") ?? initializeApp(options);

  return firebaseApp;
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

export function getFirebaseFirestore(): Firestore {
  return getFirestore(getFirebaseApp());
}
