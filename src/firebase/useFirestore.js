import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, totalRef } from './firebaseConfig.js';

export const getFirestoreTotalCount = async () => {
  console.log(totalRef);
  const docSnap = await getDoc(totalRef);
  console.log(docSnap);
  return docSnap.data();
};

export const updateFirestoreTotalCount = async (count) => {
  await updateDoc(totalRef, {
    totalVillageCount: count,
  });
};

export const getFirestoreUserData = async (userUid) => {
  console.log(userUid);
  const docRef = doc(db, 'users', userUid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getFirestoreVillageData = async (villageId) => {
  const docRef = doc(db, 'villages', villageId.toString());
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const uploadFirestoreUserData = (currentUid, userDatas) => {
  console.log(1);
  console.log(userDatas);
  return new Promise((resolve, reject) => {
    const userRef = doc(db, 'users', currentUid);
    setDoc(userRef, userDatas, { merge: true });
    resolve('success');
    reject(new Error('something wrong with upload images'));
  });
};

export const uploadFirestoreVillageData = (villageId, villageDatas) => {
  console.log(2);
  console.log(villageDatas);
  return new Promise((resolve, reject) => {
    const villageRef = doc(db, 'villages', villageId.toString());
    setDoc(villageRef, villageDatas, { merge: true });
    resolve('success');
    reject(new Error('something wrong with upload images'));
  });
};
