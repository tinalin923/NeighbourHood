import { serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';
import { uploadFirestoreVillageData } from '../../firebase/useFirestore.js';
import { upLoadStorageImages } from '../../firebase/useStorage.js';
import { TextError } from '../../styles/styledComponents/blockComponents.js';
import {
  primaryGray,
  primaryYellow,
} from '../../styles/styledComponents/color.js';
import { useAuthState } from '../contexts/AuthContext.js';
import { useEditState } from '../contexts/EditContext.js';

const UploadButton = styled.button`
  width: 40vw;
  margin: 20px;
  padding: 16px;
  border: 4px solid ${primaryYellow};
  border-radius: 8px;
  background: white;
  color: ${primaryGray};
  font-size: 1.2rem;
  font-weight: bold;
  &:hover {
    background: ${primaryYellow};
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export default function UploadBtn() {
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { currentVillageId } = useAuthState();
  const {
    // currentUserDatas,
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
    console.log(imageList);
    console.log(villageDatas);
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
    const villagePath = generatePath('/total/:villageId', {
      villageId: currentVillageId,
    });

    if (imageList.length === 0) {
      if (published) {
        console.log(villageDatas);
        uploadFirestoreVillageData(currentVillageId, villageDatas).then(
          (result) => {
            console.log(result);
            setUploading(false);
            console.log(5);
            navigate(`/total/${currentVillageId}`);
          }
        );
      } else {
        uploadFirestoreVillageData(currentVillageId, {
          ...villageDatas,
          ...update,
        }).then((result) => {
          console.log(result);
          setUploading(false);
          console.log(6);
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
        Promise.all([promise1, promise2]).then((result) => {
          console.log(result);
          setUploading(false);
          console.log(3);
          navigate(`/total/${currentVillageId}`);
        });
      } else {
        const promise1 = uploadFirestoreVillageData(currentVillageId, {
          ...villageDatas,
          ...update,
        });
        const promise2 = upLoadStorageImages(currentVillageId, imageList);
        Promise.all([promise1, promise2]).then((result) => {
          console.log(result);
          setUploading(false);
          console.log(4);
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
        <>
          <BeatLoader
            size={15}
            color="#e87191"
            loading={uploading}
            speedMultiplier={0.5}
          />
          <p>上傳中，完成後將導向發佈頁面</p>
        </>
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
