import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

// for images
import { getStorage } from 'firebase/storage';
// database
import { getFirestore } from 'firebase/firestore';

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
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

export { projectStorage, projectFirestore };
