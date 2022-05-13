import { initializeApp } from 'firebase/app';
// auth
import { getAuth } from 'firebase/auth';
// import { connectAuthEmulator, getAuth } from 'firebase/auth';
// database
import { getFirestore } from 'firebase/firestore';
// import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
// for images
import { getStorage } from 'firebase/storage';

// firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// connectAuthEmulator(auth, 'http://localhost:9099');

const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8080);

const projectStorage = getStorage(app);

export { auth, db, projectStorage };
