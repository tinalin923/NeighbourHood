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
  const { isEditMode, getDatasToContext } = useEditState();
  const { currentUid, currentVillageId, setCurrentVillageId } = useAuthState();
  const [editPageLoading, setEditPageLoading] = useState(true);

  async function start(villageId) {
    const villageDatas = await getFirestoreVillageData(villageId);
    await getDatasToContext(villageDatas);
  }

  async function getVillageId(uid) {
    const data = await getFirestoreUserData(uid);
    console.log(data);
    await start(data?.villageId);
    setCurrentVillageId(data?.villageId);
  }

  useEffect(() => {
    console.log(currentUid);
    async function getDatas() {
      await getVillageId(currentUid);
      console.log(currentVillageId);
      if (!currentVillageId) return;
      await start(currentVillageId);
      setEditPageLoading(false);
    }

    getDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUid]);

  return (
    <>
      <Header />
      {editPageLoading && <p>載入中...</p>}
      <HeroImageBlock />
      <ScrollList />
      <Switch />
      <ChiefIntroBlock />
      <VillageIntroBlock />
      <BulletinBlock />
      {isEditMode && <EditBullitinBlock1 />}
      <hr />
      {/* <Btn /> */}
      <ActivityBlock />
      {isEditMode && <EditActivityBlock />}
      {isEditMode && <UploadBtn />}
    </>
  );
};

export default Editing;
