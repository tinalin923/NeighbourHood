/* eslint-disable prettier/prettier */
/* eslint-disable function-paren-newline */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { uploadFirestoreData } from '../../hooks/firebase/useFirestore.js';
import { upLoadStorageImages } from '../../hooks/firebase/useStorage.js';
import { TextError } from '../../styles/styledComponents/blockComponents.js';
import { useAuthState } from '../contexts/AuthContext.js';
import { useEditState } from '../contexts/EditContext.js';

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
  const navigate = useNavigate();

  const userDatas = {
    published,
    introductionTextData,
    imagePathList,
    announceList,
  };

  const handleClick = () => {
    console.log(imageList);
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
    if (imageList.length === 0) {
      if (published) {
        console.log(userDatas);
        uploadFirestoreData(currentUid, userDatas).then((result) => {
          console.log(result);
          setUploading(false);
          console.log(5);
          navigate(0);
        });
      } else {
        uploadFirestoreData(currentUid, { ...userDatas, published: true }).then(
          (result) => {
            console.log(result);
            setUploading(false);
            console.log(6);
            navigate(0);
          }
        );
      }
    } else if (published) {
      const promise1 = uploadFirestoreData(currentUid, userDatas);
      console.log(promise1);
      const promise2 = upLoadStorageImages(currentUid, imageList);
      console.log(promise2);
      Promise.all([promise1, promise2]).then((result) => {
        console.log(result);
        setUploading(false);
        navigate(0);
        console.log(3);
      });
    } else {
      const promise1 = uploadFirestoreData(currentUid, {
        ...userDatas,
        published: true,
      });
      const promise2 = upLoadStorageImages(currentUid, imageList);
      Promise.all([promise1, promise2]).then((result) => {
        console.log(result);
        setUploading(false);
        navigate(0);
        console.log(4);
        setUploading(false);
      });
    }
  };
  // for ui
  useEffect(() => {
    setUploadError(null);
  }, [introductionTextData, imagePathList]);

  return (
    <div style={{ margin: '20px auto', textAlign: 'center' }}>
      {uploadError && (
        <TextError
          style={{
            display: isEditMode ? 'block' : 'none',
            margin: '8px auto',
            width: '200px',
          }}
        >
          {uploadError}
        </TextError>
      )}

      {uploading ? (
        <>
          <BeatLoader
            size={15}
            color="#e87191"
            loading={uploading}
            speedMultiplier={0.5}
          />
          <p>上傳中，完成後將重新導向頁面</p>
        </>
      ) : (
        <button
          disabled={uploading}
          type="button"
          onClick={() => handleClick()}
        >
          儲存檔案
        </button>
      )}
    </div>
  );
}
