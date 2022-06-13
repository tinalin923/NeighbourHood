/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { useParams } from 'react-router-dom';
import ActivityBlock from '../blocks/ActivityBlock.js';
import BulletinBlock from '../blocks/BulletinBlock.js';
import ChiefIntroBlock from '../blocks/ChiefIntroBlock.js';
import HeroImageBlock from '../blocks/HeroImageBlock.js';
import VillageIntroBlock from '../blocks/VillageIntroBlock.js';
import { useEditState } from '../components/contexts/EditContext.js';
import ScrollList from '../components/Edit/ScrollList.js';
import PresentFooter from '../components/Present/PresentFooter.js';
import { getFirestoreVillageData } from '../firebase/useFirestore.js';
import { primaryYellow } from '../styles/styledComponents/color.js';
import PresentHeader from '../components/Present/PresentHeader.js';

const EachPresent = () => {
  const { villageId } = useParams();
  const {
    village,
    setEditMode,
    setPublished,
    setAnnounceList,
    setActivityList,
    setScrollList,
    setIntroductionTextData,
    setImagePathList,
    setVillage,
    setLastEditTime,
  } = useEditState();
  const [presentPageLoading, setPresentPageLoading] = useState(true);

  async function presentData(vId) {
    const villageData = await getFirestoreVillageData(vId);
    console.log(villageData);
    setPublished(villageData?.published);
    setAnnounceList(villageData?.announceList);
    setActivityList(villageData?.activityList);
    setScrollList(villageData?.scrollList);
    setIntroductionTextData(villageData?.introductionTextData);
    setImagePathList(villageData?.imagePathList);
    setVillage(villageData?.villageName);
    setPresentPageLoading(false);
    console.log(villageData?.lastEditTime);
    const date = villageData?.lastEditTime.toDate().toDateString();
    const time = villageData?.lastEditTime.toDate().toLocaleTimeString();
    setLastEditTime(`${date} - ${time}`);
  }
  console.log(villageId);

  useEffect(() => {
    window.scrollTo(0, 0);
    setEditMode(false);
    presentData(villageId);
    console.log(presentPageLoading);
  }, [villageId]);

  return (
    <>
      {presentPageLoading && (
        <div
          style={{ width: '20vw', margin: '50vh auto', textAlign: 'center' }}
        >
          <BeatLoader
            size={20}
            color={`${primaryYellow}`}
            loading={presentPageLoading}
            speedMultiplier={0.8}
          />
        </div>
      )}
      {!presentPageLoading && (
        <>
          <PresentHeader breadcrumb={village} />
          <ScrollList />
          <HeroImageBlock name="0" />
          <BulletinBlock name="1" />
          <ActivityBlock name="2" />
          <VillageIntroBlock name="3" />
          <ChiefIntroBlock name="4" />
          <div style={{ height: '250px' }} />
          <PresentFooter />
        </>
      )}
    </>
  );
};

export default EachPresent;
