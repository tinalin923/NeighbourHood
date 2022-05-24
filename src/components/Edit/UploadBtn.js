import React, { useState } from 'react';
import { uploadFirestoreData } from '../../hooks/firebase/useFirestoreData.js';
import { upLoadStorageImages } from '../../hooks/firebase/useStorageData.js';
import { useAuthState } from '../contexts/AuthContext.js';
import { useEditState } from '../contexts/EditContext.js';
import { Error } from '../../styles/styledComponents/blockComponents.js';

export default function UploadBtn() {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { currentUid } = useAuthState();
  const {
    published,
    isEditMode,
    introductionTextData,
    imageList,
    imagePathList,
    announceList,
  } = useEditState();

  const userDatas = {
    published,
    introductionTextData,
    imagePathList,
    announceList,
  };

  const handleClick = () => {
    console.log(userDatas);
    console.log(introductionTextData);
    if (!introductionTextData) {
      setUploadError('請至少填寫里長介紹');
      return;
    }
    if (!imagePathList) {
      setUploadError('請選擇至少一張照片');
      return;
    }
    setUploading(true);
    if (published) {
      uploadFirestoreData(currentUid, userDatas);
      const result = upLoadStorageImages(currentUid, imageList);
      console.log(result);
      // 需要merge，因為之前在註冊的時候就創建了各自的document
      setUploading(false);
      console.log(3);
    } else {
      uploadFirestoreData(currentUid, {
        ...userDatas,
        published: true,
      });
      upLoadStorageImages(currentUid, imageList);
      setUploading(false);
    }
  };

  return (
    <div style={{ margin: '0 auto', textAlign: 'center' }}>
      {uploadError && (
        <Error
          style={{
            display: isEditMode ? 'block' : 'none',
            margin: '8px auto',
            width: '200px',
          }}
        >
          {uploadError}
        </Error>
      )}
      <button disabled={uploading} type="button" onClick={() => handleClick()}>
        儲存檔案
      </button>
    </div>
  );
}
