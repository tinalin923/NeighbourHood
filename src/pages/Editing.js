import React from 'react';
import UploadForm from '../components/Edit/UploadForm.js';
import Btn from '../components/Edit/Addblock.js';
import Switch from '../components/Edit/Switch.js';
import UploadImage from '../components/Edit/Image.js';
import Header from '../components/Header/Header.js';

const Editing = () => (
  <>
    <Header />
    <UploadForm />
    <UploadImage />
    <Btn />
    <Switch />
  </>
);

export default Editing;
