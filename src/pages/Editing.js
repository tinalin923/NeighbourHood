import React from 'react';
import BulletinBlock from '../blocks/BulletinBlock.js';
import ChiefIntroBlock from '../blocks/ChiefIntroBlock.js';
import HeroImageBlock from '../blocks/HeroImageBlock.js';
import VillageIntroBlock from '../blocks/VillageIntroBlock.js';
import { useEditState } from '../components/contexts/EditContext.js';
// import Btn from '../components/Edit/Addblock.js';
import ScrollList from '../components/Edit/ScrollList.js';
import Switch from '../components/Edit/Switch.js';
import Header from '../components/Header/Header.js';
import EditBullitinBlock from '../blocks/EditBullitinBlock.js';
import UploadBtn from '../components/Edit/UploadBtn.js';

const Editing = () => {
  const { isEditMode } = useEditState();
  return (
    <>
      <Header />
      <HeroImageBlock />
      <ScrollList />
      <Switch />
      <ChiefIntroBlock />
      <VillageIntroBlock />
      <BulletinBlock />
      {isEditMode && <EditBullitinBlock />}
      <hr />
      {/* <Btn /> */}
      {isEditMode && <UploadBtn />}
    </>
  );
};

export default Editing;
