import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, usersCollection } from '../../firebase/firebaseConfig.js';

export const getFirestoreData = async (userUid) => {
  const docRef = doc(usersCollection, userUid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const uploadFirestoreData = (currentUid, userDatas) => {
  console.log(2);
  console.log(userDatas);
  const userRef = doc(db, 'users', currentUid);
  // 需要merge，因為之前在註冊的時候就創建了各自的document
  setDoc(userRef, userDatas, { merge: true });
};
