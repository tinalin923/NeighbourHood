import React from 'react';
import Btn from '../components/Edit/Addblock.js';
import HeroImageBlock from '../components/Edit/HeroImageBlock.js';
import UploadImage from '../components/Edit/Image.js';
import Switch from '../components/Edit/Switch.js';
import Header from '../components/Header/Header.js';

const Editing = () => (
  <>
    <Header />
    <HeroImageBlock />
    <UploadImage />
    <Btn />
    <Switch />
  </>
);

export default Editing;
