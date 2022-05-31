import React, { useEffect, useState } from 'react';
import ActivityBlock from '../blocks/ActivityBlock.js';
import BulletinBlock from '../blocks/BulletinBlock.js';
import ChiefIntroBlock from '../blocks/ChiefIntroBlock.js';
import EditActivityBlock from '../blocks/EditActivityBlock.js';
import EditBullitinBlock1 from '../blocks/EditBullitinBlock1.js';
import HeroImageBlock from '../blocks/HeroImageBlock.js';
import VillageIntroBlock from '../blocks/VillageIntroBlock.js';
import { useAuthState } from '../components/contexts/AuthContext.js';
import { useEditState } from '../components/contexts/EditContext.js';
// import Btn from '../components/Edit/Addblock.js';
import ScrollList from '../components/Edit/ScrollList.js';
import Switch from '../components/Edit/Switch.js';
import UploadBtn from '../components/Edit/UploadBtn.js';
import Header from '../components/Header/Header.js';
import {
  getFirestoreUserData,
  getFirestoreVillageData,
} from '../firebase/useFirestore.js';

const Editing = () => {
  const { isEditMode, getDatasToContext, published } = useEditState();
  const { currentUid, setCurrentVillageId } = useAuthState();
  const [editPageLoading, setEditPageLoading] = useState(true);

  async function getVillageId(uid) {
    const data = await getFirestoreUserData(uid);
    console.log(data);
    const { villageId } = data;
    setCurrentVillageId(villageId);
    const villageDatas = await getFirestoreVillageData(villageId);
    await getDatasToContext(villageDatas);
    setEditPageLoading(false);
  }

  useEffect(() => {
    console.log(currentUid);
    getVillageId(currentUid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUid]);

  return (
    <>
      <Header />
      {editPageLoading && <p>資料載入中...</p>}
      <HeroImageBlock name="0" />
      <ScrollList />
      <Switch />
      {published ? <BulletinBlock name="1" /> : <ChiefIntroBlock name="1" />}
      {published && isEditMode && <EditBullitinBlock1 />}
      {published ? <ActivityBlock name="2" /> : <VillageIntroBlock name="2" />}
      {published && isEditMode && <EditActivityBlock />}
      {published ? <VillageIntroBlock name="3" /> : <BulletinBlock name="3" />}
      {!published && isEditMode && <EditBullitinBlock1 />}
      {published ? <ChiefIntroBlock name="4" /> : <ActivityBlock name="4" />}
      {!published && isEditMode && <EditActivityBlock />}
      <hr />
      {isEditMode && <UploadBtn />}
    </>
  );
};

export default Editing;
