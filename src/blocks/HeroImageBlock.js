import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAuthState } from '../components/contexts/AuthContext.js';
import { useEditState } from '../components/contexts/EditContext.js';
import { getStorageImages } from '../firebase/useStorage.js';
import { ImageError } from '../styles/styledComponents/blockComponents.js';
import compressImage from '../utils/imageCompress.js';
import { secondaryGray, thirdGray } from '../styles/styledComponents/color.js';

const InputBlock = styled.label`
  z-index: 2;
  position: absolute;
  top: 60vh;
  left: 40vw;
  width: 20%;
  min-height: 140px;
  border-radius: 40px;
  cursor: pointer;
  :hover > div {
    opacity: 0.9;
  }
  :hover > p {
    color: white;
  }
`;
const P = styled.p`
  padding: 10px;
  text-align: center;
  font-weight: bold;
  color: #8d92a5;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: white;
  opacity: 0.5;
`;
const icon = {
  opacity: '0.8',
};

const PlaceHolder = styled.div`
  width: 100vw;
  height: 100vh;
`;
const HeroImage = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: white;
`;
const HeroImageBlock = () => {
  const { currentVillageId } = useAuthState();
  const {
    published,
    isEditMode,
    setImageList,
    imagePathList,
    setImagePathList,
    village,
  } = useEditState();
  const [temporaryHeroImageUrl, setTemporaryHeroImageUrl] = useState();
  const [heroImageError, setHeroImageError] = useState(null);
  const fileInput = useRef();
  console.log('hero refresh');

  // 載入時要觸發的效果
  useEffect(() => {
    console.log('hero');
    if (!published) {
      console.log('還沒上傳過不用讀取');
      return;
    }
    if (!imagePathList?.heroImage) {
      console.log('有上傳過但沒有照片');
      return;
    }
    if (temporaryHeroImageUrl) {
      console.log('已經有照片了');
      return;
    }
    console.log('want to get url');
    getStorageImages(imagePathList.heroImage)
      .then((storedUrl) => {
        console.log('get from firestorage');
        setTemporaryHeroImageUrl(storedUrl);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVillageId, published]);

  const handleChange = async () => {
    const imageFile = fileInput.current.files[0];
    const imageFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (imageFile && imageFileTypes.includes(imageFile.type)) {
      setHeroImageError(null);
    } else {
      setHeroImageError('請選擇照片檔案(.jpeg 或 .png)');
    }
    // compressedImage 為一Blob物件
    const compressedImage = await compressImage(imageFile, 1960);
    console.log(compressedImage);
    // 要上傳到firestorage需要blob檔
    setImageList((prev) => [...prev, compressedImage]);
    setImagePathList((prev) => ({
      ...prev,
      heroImage: `${currentVillageId}/${compressedImage?.name}`,
    }));
    // 將blob檔轉為blob url, 做即時呈現
    const compressedImageURL = URL.createObjectURL(compressedImage);
    //  compressedImageURL為一 blob+localhost開頭的url
    setTemporaryHeroImageUrl(compressedImageURL);
    // URL.revokeObjectURL(compressedImageURL);  加了會讓我無法呈現出來
  };

  return (
    <>
      <PlaceHolder id="upload_output">
        <HeroImage
          name="0"
          style={{
            backgroundImage: temporaryHeroImageUrl
              ? `url(${temporaryHeroImageUrl})`
              : `linear-gradient(90deg, ${secondaryGray}, ${thirdGray})`,
            opacity: isEditMode ? '0.7' : '1',
            top: isEditMode ? '80px' : '0px',
          }}
        >
          {heroImageError && (
            <ImageError style={{ display: isEditMode ? 'block' : 'none' }}>
              {heroImageError}
            </ImageError>
          )}
        </HeroImage>
      </PlaceHolder>
      <Title style={{ top: isEditMode ? '51%' : '50%' }}>{village}</Title>
      <InputBlock style={{ display: isEditMode ? 'block' : 'none' }}>
        <IconContainer>
          <FontAwesomeIcon icon={solid('plus')} style={icon} />
        </IconContainer>
        <input
          ref={fileInput}
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={() => handleChange()}
          style={{ display: 'none' }}
        />
        {temporaryHeroImageUrl ? <P>選擇其他圖片</P> : <P>新增主要畫面</P>}
      </InputBlock>
    </>
  );
};

export default HeroImageBlock;
