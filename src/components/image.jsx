import React from 'react';
import useFirestore from '../hooks/useFirestore.js';

const UploadImage = () => {
  const { docs } = useFirestore('covers');
  console.log(docs[0]);
  return (
    <div>
      {
        // docs && <img key={docs[0].id} src={docs[0].url} alt="cover" />
        docs.map((doc) => (
          <img key={doc.id} src={doc.url} alt="cover" />
        ))
      }
    </div>
  );
};
export default UploadImage;
