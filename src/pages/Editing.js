import React from 'react';
import UploadForm from '../components/Edit/Upload.jsx';
import Btn from '../components/Edit/Addblock.jsx';
import Switch from '../components/Edit/Switch.jsx';
import UploadImage from '../components/Edit/Image.jsx';
import Navigation from '../components/Header/Navigation.js';

const Editing = () => (
  <>
    <Navigation />
    <p>請點選以新增封面</p>
    <UploadForm />
    <UploadImage />
    <Btn />
    <Switch />
  </>
);

export default Editing;
