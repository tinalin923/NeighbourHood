/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app';
// auth
import { getAuth, connectAuthEmulator } from 'firebase/auth';
// database
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
// for images
import { getStorage } from 'firebase/storage';

// firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

const projectStorage = getStorage(app);

export { auth, db, projectStorage };
