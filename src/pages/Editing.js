import React from 'react';
import Btn from '../components/Edit/Addblock.js';
import HeroImageBlock from '../blocks/HeroImageBlock.js';
import Switch from '../components/Edit/Switch.js';
import Header from '../components/Header/Header.js';
import ChiefIntroBlock from '../blocks/ChiefIntroBlock.js';
import VillageIntroBlock from '../blocks/VillageIntroBlock.js';
import ScrollList from '../components/Edit/ScrollList.js';

const Editing = () => (
  <>
    <Header />
    <HeroImageBlock />
    <ScrollList />
    <Switch />
    <ChiefIntroBlock />
    <VillageIntroBlock name="2" />
    <hr />
    <Btn />
  </>
);

export default Editing;
