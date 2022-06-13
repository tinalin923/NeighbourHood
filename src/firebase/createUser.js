import {
  doc,
  serverTimestamp,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from './firebaseConfig.js';
import {
  getFirestoreTotalCount,
  updateFirestoreTotalCount,
} from './useFirestore.js';

export const checkCityVillage = (city, village) => {
  const cityVillageRef = collection(db, 'villages');
  const villageQuery = query(
    cityVillageRef,
    where('villageName', 'in', [`${village}`])
  );
  const cityQuery = query(cityVillageRef, where('cityName', 'in', [`${city}`]));

  async function checkVillageCity(villageQ, cityQ) {
    const villageSnapshot = await getDocs(villageQ);
    if (villageSnapshot.empty === false) {
      const citySnapshot = await getDocs(cityQ);
      if (villageSnapshot.docs[0].id === citySnapshot.docs[0]?.id) {
        return 'repeated';
      }
      return 'not repeated';
    }
    return 'not repeated';
  }

  const checkResult = checkVillageCity(villageQuery, cityQuery);

  return checkResult;
};

const createInitialUserDatas = async (uid, email, city, village) => {
  const { totalVillageCount } = await getFirestoreTotalCount();
  let newVillageId = totalVillageCount + 1;
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
    introductionTextData: null,
    lastEditTime: serverTimestamp(),
    scrollList: [
      { id: '0', title: village },
      { id: '1', title: '里長介紹' },
      { id: '2', title: '村里介紹' },
      { id: '3', title: '最新消息' },
      { id: '4', title: '活動訊息' },
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
        picture: '0/defaultActivityPicture.jpg',
        details: '歡迎共襄盛舉',
      },
    ],
  };
  newVillageId = newVillageId.toString();
  await setDoc(doc(db, 'users', uid), initialUserDatas);
  await setDoc(doc(db, 'villages', newVillageId), initialVillageDatas);
  return newVillageId;
};

export default createInitialUserDatas;
