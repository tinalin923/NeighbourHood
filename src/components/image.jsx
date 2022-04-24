import React from 'react';
import useFirestore from '../hooks/useFirestore.js';

const UploadImage = () => {
  const { docs } = useFirestore('covers');
  console.log(docs);
  return <div>images</div>;
};
export default UploadImage;
