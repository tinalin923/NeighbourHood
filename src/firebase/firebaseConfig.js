import { initializeApp } from 'firebase/app';
// auth
import { getAuth, connectAuthEmulator } from 'firebase/auth';
// database
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
// for images
import { getStorage } from 'firebase/storage';

// firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDb4shKSNi24JzP2ZfY6j2li4sl1kLZeeQ',
  authDomain: 'neighbourhood-2022.firebaseapp.com',
  projectId: 'neighbourhood-2022',
  storageBucket: 'neighbourhood-2022.appspot.com',
  messagingSenderId: '681192954977',
  appId: '1:681192954977:web:dea9c119f6632772a41e20',
  measurementId: 'G-BFHJET0E4L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');
const db = getFirestore(app);
// const projectFirestore = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

const projectStorage = getStorage(app);
export { auth, db, projectStorage };
