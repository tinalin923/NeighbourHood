import React from 'react';
import Btn from '../components/Edit/Addblock.js';
import HeroImageBlock from '../blocks/HeroImageBlock.js';
import UploadImage from '../components/Edit/Image.js';
import Switch from '../components/Edit/Switch.js';
import Header from '../components/Header/Header.js';
import ChiefIntroBlock from '../blocks/ChiefIntroBlock.js';
import VillageIntroBlock from '../blocks/VillageIntroBlock.js';

const Editing = () => (
  <>
    <Header />
    <HeroImageBlock />
    <UploadImage />
    <Switch />
    <ChiefIntroBlock />
    <VillageIntroBlock />
    <hr />
    <Btn />
  </>
);

export default Editing;
