import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

const createUserData = async (uid, email, villageName) => {
  const userData = {
    village: villageName,
    email,
    createdAt: serverTimestamp(),
    uid,
  };
  await setDoc(doc(db, 'users', uid), userData);
  return uid;
};

export default createUserData;
