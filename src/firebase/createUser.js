import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig.js';
import {
  getFirestoreTotalCount,
  updateFirestoreTotalCount,
} from './useFirestore.js';

const createInitialUserDatas = async (uid, email, city, village) => {
  const { totalVillageCount } = await getFirestoreTotalCount();
  console.log(totalVillageCount);
  const newVillageId = totalVillageCount + 1;
  await updateFirestoreTotalCount(newVillageId);

  const initialUserDatas = {
    email,
    createdAt: serverTimestamp(),
    uid,
    cityName: city,
    villageName: village,
    villageId: newVillageId,
  };

  const initialVillageDatas = {
    villageId: newVillageId,
    published: false,
    villageName: village,
    cityName: city,
    introductionTextData: '',
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
    activityList: [
      {
        id: '0',
        title: '活動範例',
        picture: '',
        details: '歡迎共襄盛舉',
      },
    ],
  };
  console.log(newVillageId.toString());
  console.log(newVillageId);
  await setDoc(doc(db, 'users', uid), initialUserDatas);
  await setDoc(
    doc(db, 'villages', newVillageId.toString()),
    initialVillageDatas
  );
  return { uid, newVillageId };
};

export default createInitialUserDatas;
