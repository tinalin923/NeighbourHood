import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAuthState } from '../components/contexts/AuthContext.js';
import { useEditState } from '../components/contexts/EditContext.js';
import { getStorageImages } from '../hooks/firebase/useStorageData.js';
import compressImage from '../utils/imageCompress.js';

const InputBlock = styled.label`
  z-index: 2;
  position: absolute;
  top: 60vh;
  left: 40vw;
  width: 20%;
  min-height: 140px;
  border: 4px solid #8d92a5;
  border-radius: 40px;
  :hover {
    background-color: #8d92a5;
  }
  :hover > div {
    opacity: 0.9;
  }
  :hover > p {
    color: white;
  }
`;
const P = styled.p`
  margin-top: 20px;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  color: #8d92a5;
`;
const Error = styled.p`
  position: absolute;
  top: 40vh;
  right: 0;
  left: 0;
  margin: auto;
  width: 50%;
  text-align: center;
  color: red;
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
  position: 'relative',
  opacity: '0.8',
};
const Input = styled.input`
  display: none;
`;
const PlaceHolder = styled.div`
  width: 100vw;
  height: 100vh;
`;
const HeroImage = styled.img`
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
  const { currentUid } = useAuthState();
  const { isEditMode, heroImage, setHeroImage, villageName } = useEditState();
  const [temporaryHeroImageUrl, setTemporaryHeroImageUrl] = useState(heroImage);
  console.log(currentUid); // 為何我修改其他區塊 這邊會一直被觸發

  useEffect(() => {
    async function getHero() {
      if (!(heroImage instanceof Blob) && heroImage) {
        getStorageImages(heroImage).then((storedUrl) => {
          setTemporaryHeroImageUrl(storedUrl);
        });
      }
    }
    getHero();
  }, [currentUid, heroImage]);

  const [heroImageError, setHeroImageError] = useState(null);

  const fileInput = useRef();
  const handleImageUpload = async () => {
    const imageFile = fileInput.current.files[0];
    const imageFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (imageFile && imageFileTypes.includes(imageFile.type)) {
      setHeroImageError(null);
    } else {
      setHeroImageError('請選擇照片檔案(.jpeg 或 .png)');
    }
    // compressedImage 為一Blob物件
    const compressedImage = await compressImage(imageFile, 1960);
    // 要上傳到firestorage需要blob檔
    setHeroImage(compressedImage);
    // 將blob檔轉為blob url, 做即時呈現
    const compressedImageURL = URL.createObjectURL(compressedImage);
    //  compressedImageURL為一 blob+localhost開頭的url
    setTemporaryHeroImageUrl(compressedImageURL);
    // URL.revokeObjectURL(compressedImageURL);  加了會讓我無法呈現出來
  };

  return (
    <>
      <PlaceHolder id="upload_output">
        {heroImageError && (
          <Error style={{ display: isEditMode ? 'block' : 'none' }}>
            {heroImageError}
          </Error>
        )}
        <HeroImage
          name="0"
          style={{
            backgroundImage: temporaryHeroImageUrl
              ? `url(${temporaryHeroImageUrl})`
              : 'linear-gradient(-45deg, #fcd856, #bdbbb1)',
            opacity: isEditMode ? '0.7' : '1',
            top: isEditMode ? '80px' : '0px',
          }}
        />
      </PlaceHolder>
      <Title style={{ top: isEditMode ? '51%' : '50%' }}>{villageName}</Title>
      <InputBlock style={{ display: isEditMode ? 'block' : 'none' }}>
        {temporaryHeroImageUrl ? <P>選擇其他圖片</P> : <P>點選以新增圖片</P>}
        <IconContainer>
          <FontAwesomeIcon icon={solid('plus')} style={icon} />
        </IconContainer>
        <Input
          ref={fileInput}
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={() => handleImageUpload()}
        />
      </InputBlock>
    </>
  );
};

export default HeroImageBlock;
