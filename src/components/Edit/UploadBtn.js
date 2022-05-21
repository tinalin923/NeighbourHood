import React, { useState } from 'react';
import { uploadFirestoreData } from '../../hooks/firebase/useFirestoreData.js';
import { upLoadStorageImages } from '../../hooks/firebase/useStorageData.js';
import { useAuthState } from '../contexts/AuthContext.js';
import { useEditState } from '../contexts/EditContext.js';

export default function UploadBtn() {
  const [uploading, setUploading] = useState(false);
  const { currentUid } = useAuthState();
  const {
    published,
    heroImage,
    chiefAvator,
    chiefName,
    chiefInfo,
    announceList,
  } = useEditState();

  const userImages = [heroImage, chiefAvator];
  const userDatas = {
    published,
    chiefName,
    chiefInfo,
    announceList,
    heroImage: `${currentUid}/${heroImage?.name}`,
    chiefAvator: `${currentUid}/${chiefAvator?.name}`,
  };

  const handleClick = () => {
    setUploading(true);
    if (published) {
      uploadFirestoreData(currentUid, userDatas);
      const result = upLoadStorageImages(currentUid, userImages);
      console.log(result);
      // 需要merge，因為之前在註冊的時候就創建了各自的document
      setUploading(false);
      console.log(3);
    } else {
      uploadFirestoreData(currentUid, { ...userDatas, published: true });
      upLoadStorageImages(currentUid, userImages);
      setUploading(false);
    }
  };

  return (
    <button disabled={uploading} type="button" onClick={() => handleClick()}>
      儲存檔案
    </button>
  );
}
