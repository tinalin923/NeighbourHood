import React from 'react';
import UploadForm from '../components/Edit/upload.jsx';
import Btn from '../components/Edit/addblock.jsx';
import Switch from '../components/Edit/switch.jsx';
import UploadImage from '../components/Edit/image.jsx';
import Header from '../components/Header/Header.js';

const Editing = () => (
  <>
    <Header />
    <p>請點選以新增封面</p>
    <UploadForm />
    <UploadImage />
    <Btn />
    <Switch />
  </>
);

export default Editing;
