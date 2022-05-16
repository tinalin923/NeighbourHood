import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import compressImage from '../../utils/imageCompress.js';
import { useEditState } from '../contexts/EditContext.js';

const InputBlock = styled.label`
  z-index: 2;
  position: absolute;
  top: 50vh;
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

const HeroImage = styled.img`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const HeroImageBlock = () => {
  const { isEditMode, heroImage, setHeroImage } = useEditState();
  const [heroImageError, setHeroImageError] = useState('');
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
    const compressedImage = await compressImage(imageFile, 1080);
    console.log(compressedImage);
    const compressedImageURL = URL.createObjectURL(compressedImage);
    //  compressedImageURL為一 blob+localhost開頭的url
    setHeroImage(compressedImageURL);
    // URL.revokeObjectURL(compressedImageURL);  加了會讓我無法呈現出來
  };

  return (
    <>
      <InputBlock style={{ display: isEditMode ? 'block' : 'none' }}>
        {heroImage ? <P>選擇其他圖片</P> : <P>點選以新增圖片</P>}
        <IconContainer>
          <FontAwesomeIcon icon={solid('plus')} style={icon} />
        </IconContainer>
        <Input
          ref={fileInput}
          type="file"
          accept=".jpg, .png, .jpeg"
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleImageUpload}
        />
      </InputBlock>
      <div id="upload_output">
        {heroImageError && (
          <Error style={{ display: isEditMode ? 'block' : 'none' }}>
            {heroImageError}
          </Error>
        )}
        <HeroImage
          style={{
            backgroundImage: heroImage
              ? `url(${heroImage})`
              : 'linear-gradient(-45deg, #fcd856, #bdbbb1)',
            opacity: isEditMode ? '0.7' : '1',
            top: isEditMode ? '80px' : '0px',
          }}
        />
      </div>
    </>
  );
};

export default HeroImageBlock;
