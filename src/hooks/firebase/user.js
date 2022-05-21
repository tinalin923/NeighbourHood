import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig.js';

const createInitialUserDatas = async (uid, email, villageName) => {
  const initialUserDatas = {
    published: false,
    village: villageName,
    email,
    createdAt: serverTimestamp(),
    uid,
    scrollList: [
      { id: '0', title: villageName },
      { id: '1', title: '里長介紹' },
      { id: '2', title: '村里介紹' },
      { id: '3', title: '公佈欄' },
    ],
  };
  await setDoc(doc(db, 'users', uid), initialUserDatas);
  return uid;
};

export default createInitialUserDatas;
