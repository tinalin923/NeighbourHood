import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import ActivityBlock from '../blocks/ActivityBlock.js';
import BulletinBlock from '../blocks/BulletinBlock.js';
import ChiefIntroBlock from '../blocks/ChiefIntroBlock.js';
import HeroImageBlock from '../blocks/HeroImageBlock.js';
import VillageIntroBlock from '../blocks/VillageIntroBlock.js';
import Footer from '../components/Present/Footer.js';
// import { useAuthState } from '../components/contexts/AuthContext.js';
import { useEditState } from '../components/contexts/EditContext.js';
import ScrollList from '../components/Edit/ScrollList.js';
import { getFirestoreVillageData } from '../firebase/useFirestore.js';

const EachPresent = () => {
  const { villageId } = useParams();
  const {
    setEditMode,
    setPublished,
    setAnnounceList,
    setActivityList,
    setScrollList,
    setIntroductionTextData,
    setImagePathList,
    setVillage,
  } = useEditState();

  async function presentData(vId) {
    const villageData = await getFirestoreVillageData(vId);
    setPublished(villageData?.published);
    setAnnounceList(villageData?.announceList);
    setActivityList(villageData?.activityList);
    setScrollList(villageData?.scrollList);
    setIntroductionTextData(villageData?.introductionTextData);
    setImagePathList(villageData?.imagePathList);
    setVillage(villageData?.villageName);
  }
  console.log(villageId);
  useEffect(() => {
    setEditMode(false);
    presentData(villageId);
  }, []);
  return (
    <>
      <ScrollList />
      <HeroImageBlock name="0" />
      <BulletinBlock name="1" />
      <ActivityBlock name="2" />
      <VillageIntroBlock name="3" />
      <ChiefIntroBlock name="4" />
      <Footer />
    </>
  );
};

export default EachPresent;
