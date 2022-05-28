/* eslint-disable prettier/prettier */
/* eslint-disable function-paren-newline */
import React, { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { uploadFirestoreVillageData } from '../../firebase/useFirestore.js';
import { upLoadStorageImages } from '../../firebase/useStorage.js';
import { TextError } from '../../styles/styledComponents/blockComponents.js';
import { useAuthState } from '../contexts/AuthContext.js';
import { useEditState } from '../contexts/EditContext.js';

export default function UploadBtn() {
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { currentVillageId } = useAuthState();
  const {
    // currentUserDatas,
    published,
    isEditMode,
    introductionTextData,
    imageList,
    imagePathList,
    announceList,
    activityList,
  } = useEditState();

  const villageDatas = {
    published,
    introductionTextData,
    imagePathList,
    announceList,
    activityList,
  };

  const handleClick = () => {
    console.log(imageList);
    console.log(villageDatas);
    console.log(introductionTextData);
    const villagePath = generatePath('/total/:villageId', {
      villageId: currentVillageId,
    });
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
        console.log(villageDatas);
        uploadFirestoreVillageData(currentVillageId, villageDatas).then(
          (result) => {
            console.log(result);
            setUploading(false);
            console.log(5);
            // navigate(0);
            navigate(villagePath);
          }
        );
      } else {
        uploadFirestoreVillageData(currentVillageId, {
          ...villageDatas,
          published: true,
        }).then((result) => {
          console.log(result);
          setUploading(false);
          console.log(6);
          // navigate(0);
          navigate(villagePath);
        });
      }
    } else if (published) {
      const promise1 = uploadFirestoreVillageData(
        currentVillageId,
        villageDatas
      );
      console.log(promise1);
      const promise2 = upLoadStorageImages(currentVillageId, imageList);
      console.log(promise2);
      Promise.all([promise1, promise2]).then((result) => {
        console.log(result);
        setUploading(false);
        // navigate(0);
        console.log(3);
        navigate(villagePath);
      });
    } else {
      const promise1 = uploadFirestoreVillageData(currentVillageId, {
        ...villageDatas,
        published: true,
      });
      const promise2 = upLoadStorageImages(currentVillageId, imageList);
      Promise.all([promise1, promise2]).then((result) => {
        console.log(result);
        setUploading(false);
        // navigate(0);
        console.log(4);
        setUploading(false);
        navigate(villagePath);
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
