import { serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { uploadFirestoreVillageData } from '../../firebase/useFirestore.js';
import { upLoadStorageImages } from '../../firebase/useStorage.js';
import { TextError } from '../../styles/styledComponents/blockComponents.js';
import { UploadButton } from '../../styles/styledComponents/button.js';
import { useAuthState } from '../contexts/AuthContext.js';
import { useEditState } from '../contexts/EditContext.js';

export default function UploadBtn() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { currentVillageId } = useAuthState();
  const {
    village,
    published,
    editMode,
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
    lastEditTime: serverTimestamp(),
  };

  const update = {
    published: true,
    scrollList: [
      { id: '0', title: village },
      { id: '1', title: '最新消息' },
      { id: '2', title: '活動訊息' },
      { id: '3', title: '村里介紹' },
      { id: '4', title: '里長介紹' },
    ],
  };

  const handleClick = () => {
    if (!introductionTextData) {
      setUploadError('請至少填寫里長介紹');
      return;
    }
    if (!imagePathList) {
      setUploadError('請選擇至少一張照片');
      return;
    }
    setUploading(true);
    const villagePath = generatePath('/total/:villageId', {
      villageId: currentVillageId,
    });

    if (imageList.length === 0) {
      if (published) {
        uploadFirestoreVillageData(currentVillageId, villageDatas).then(() => {
          setUploading(false);
          navigate(`/totalvillages/${currentVillageId}`);
        });
      } else {
        uploadFirestoreVillageData(currentVillageId, {
          ...villageDatas,
          ...update,
        }).then(() => {
          setUploading(false);
          navigate(villagePath);
        });
      }
    }
    if (imageList.length !== 0) {
      if (published) {
        const promise1 = uploadFirestoreVillageData(
          currentVillageId,
          villageDatas
        );
        const promise2 = upLoadStorageImages(currentVillageId, imageList);
        Promise.all([promise1, promise2]).then(() => {
          setUploading(false);
          navigate(`/totalvillages/${currentVillageId}`);
        });
      } else {
        const promise1 = uploadFirestoreVillageData(currentVillageId, {
          ...villageDatas,
          ...update,
        });
        const promise2 = upLoadStorageImages(currentVillageId, imageList);
        Promise.all([promise1, promise2]).then(() => {
          setUploading(false);
          navigate(villagePath);
        });
      }
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
            display: editMode ? 'block' : 'none',
            margin: '8px auto',
            width: '200px',
          }}
        >
          {uploadError}
        </TextError>
      )}

      {uploading ? (
        <div
          style={{
            position: 'fixed',
            zIndex: '99',
            background: 'rgba(0,0,0,0.8)',
            width: '100%',
            top: '0',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            style={{
              marginTop: '50vh',
            }}
          >
            <BeatLoader
              size={25}
              color="#e87191"
              loading={uploading}
              speedMultiplier={0.5}
            />
            <p style={{ color: '#f5f5f5', fontSize: '2.5rem' }}>
              上傳中，完成後將導向發佈頁面
            </p>
          </div>
        </div>
      ) : (
        <UploadButton
          disabled={uploading}
          type="button"
          onClick={() => handleClick()}
        >
          {published ? '發佈更新' : '儲存並發佈鄰里頁面'}
        </UploadButton>
      )}
    </div>
  );
}
