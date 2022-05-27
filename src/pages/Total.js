import React from 'react';
import ActivityBlock from '../blocks/ActivityBlock.js';
import BulletinBlock from '../blocks/BulletinBlock.js';
import ChiefIntroBlock from '../blocks/ChiefIntroBlock.js';
import HeroImageBlock from '../blocks/HeroImageBlock.js';
import VillageIntroBlock from '../blocks/VillageIntroBlock.js';
import ScrollList from '../components/Edit/ScrollList.js';

const Total = () => {
  console.log('456');
  return (
    <>
      <HeroImageBlock />
      <ScrollList />
      <ChiefIntroBlock />
      <VillageIntroBlock />
      <BulletinBlock />
      <ActivityBlock />
      {/* <RouterLink to={`/total/${currentUid}`}>yilanc</RouterLink> */}
      {/* <Outlet /> */}
    </>
  );
};
export default Total;
