import { doc, getDoc } from 'firebase/firestore';
import { usersCollection } from '../firebase/firebaseConfig.js';

const getFirestoreData = async (userUid) => {
  const docRef = doc(usersCollection, userUid);
  const docSnap = await getDoc(docRef);
  const villageName = docSnap.data().village;
  return villageName;
};

export default getFirestoreData;
