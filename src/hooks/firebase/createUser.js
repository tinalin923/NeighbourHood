import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig.js';

const createInitialUserDatas = async (uid, email, city, village) => {
  const initialUserDatas = {
    published: false,
    cityName: city,
    villageName: village,
    email,
    createdAt: serverTimestamp(),
    uid,
    scrollList: [
      { id: '0', title: village },
      { id: '1', title: '里長介紹' },
      { id: '2', title: '村里介紹' },
      { id: '3', title: '公佈欄' },
      { id: '4', title: '活動' },
    ],
    announceList: [
      {
        id: '0',
        title: '公告範例',
        picture: '',
        details: '區域路段將有為期一週的道路施工，行經請小心。',
      },
    ],
  };
  await setDoc(doc(db, 'users', uid), initialUserDatas);
  return uid;
};

export default createInitialUserDatas;
