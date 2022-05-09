import React from 'react';
import UploadForm from './components/upload.jsx';
import Btn from './components/addblock.jsx';
import Switch from './components/switch.jsx';
import UploadImage from './components/image.jsx';

import './styles/style.scss';

export default function App() {
  return (
    <>
      <UploadForm />
      <Switch />
      <UploadImage />
      <Btn />
    </>
  );
}
