import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// auth
import { getAuth } from 'firebase/auth';
// import { connectAuthEmulator, getAuth } from 'firebase/auth';

// database
import { getFirestore, doc, collection } from 'firebase/firestore';
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
const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore(app);

// connectFirestoreEmulator(db, 'localhost', 8080);
const totalRef = doc(db, 'total', 'totalCount');
const usersCollection = collection(db, 'users');
const villageCollection = collection(db, 'villages');

const projectStorage = getStorage(app);

export {
  db,
  auth,
  totalRef,
  usersCollection,
  villageCollection,
  projectStorage,
  analytics,
};
