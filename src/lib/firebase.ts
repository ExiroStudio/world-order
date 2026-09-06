import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'dummy-api-key',
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    'world-order.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'world-order',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    'world-order.appspot.com',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:1234567890:web:abcdef',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

declare global {
  var _firestoreEmulatorConnected: boolean | undefined;
}

if (
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true' ||
  Boolean(process.env.FIRESTORE_EMULATOR_HOST)
) {
  const host =
    process.env.FIRESTORE_EMULATOR_HOST?.split(':')[0] || '127.0.0.1';
  const port = parseInt(
    process.env.FIRESTORE_EMULATOR_HOST?.split(':')[1] || '8080',
    10
  );

  if (!globalThis._firestoreEmulatorConnected) {
    try {
      connectFirestoreEmulator(db, host, port);
      globalThis._firestoreEmulatorConnected = true;
    } catch {
      // Emulator connection skipped or already initialized
    }
  }
}

export { app, db };
