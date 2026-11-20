import { getApps, initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

export class FirebaseConfigError extends Error {
	constructor(variable: string) {
		super(`Falta configurar ${variable} en el archivo .env.`);
		this.name = 'FirebaseConfigError';
	}
}

function getRequiredEnvironmentVariable(name: string, value: string | undefined): string {
	if (!value?.trim()) {
		throw new FirebaseConfigError(name);
	}

	return value.trim();
}

function getFirebaseApp(): FirebaseApp {
	const options: FirebaseOptions = {
		apiKey: getRequiredEnvironmentVariable(
			'PUBLIC_FIREBASE_API_KEY',
			import.meta.env.PUBLIC_FIREBASE_API_KEY,
		),
		authDomain: getRequiredEnvironmentVariable(
			'PUBLIC_FIREBASE_AUTH_DOMAIN',
			import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
		),
		projectId: getRequiredEnvironmentVariable(
			'PUBLIC_FIREBASE_PROJECT_ID',
			import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
		),
		appId: getRequiredEnvironmentVariable(
			'PUBLIC_FIREBASE_APP_ID',
			import.meta.env.PUBLIC_FIREBASE_APP_ID,
		),
	};

	return getApps().find((app) => app.name === '[DEFAULT]') ?? initializeApp(options);
}

export function getFirebaseAuth(): Auth {
	return getAuth(getFirebaseApp());
}
