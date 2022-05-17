import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useEditState } from '../contexts/EditContext.js';
import compressImage from '../../utils/imageCompress.js';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChiefAvatorImage = styled.img`
  width: 35vw;
  aspect-ratio: 3/3.2;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 600px) {
    width: 330px;
  }
`;

const InputBlock = styled.label`
  position: relative;
  top: -30vh;
  min-width: 20%;
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
  position: relative;
  top: 18vh;
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

const VillageImageBlock = () => {
  const { isEditMode, chiefAvator, setChiefAvator } = useEditState();
  const [chiefAvatorError, setChiefAvatorError] = useState('');
  const fileInput = useRef();
  const handleImageUpload = async () => {
    const imageFile = fileInput.current.files[0];
    const imageFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (imageFile && imageFileTypes.includes(imageFile.type)) {
      setChiefAvatorError(null);
    } else {
      setChiefAvatorError('請選擇照片檔案(.jpeg 或 .png)');
    }
    // compressedImage 為一Blob物件
    const compressedImage = await compressImage(imageFile, 1080);
    console.log(compressedImage);
    const compressedImageURL = URL.createObjectURL(compressedImage);
    //  compressedImageURL為一 blob+localhost開頭的url
    setChiefAvator(compressedImageURL);
    // URL.revokeObjectURL(compressedImageURL);  加了會讓我無法呈現出來
  };

  return (
    <Wrapper>
      {chiefAvatorError && (
        <Error style={{ display: isEditMode ? 'block' : 'none' }}>
          {chiefAvatorError}
        </Error>
      )}
      <ChiefAvatorImage
        style={{
          backgroundImage: chiefAvator
            ? `url(${chiefAvator})`
            : 'linear-gradient(-45deg, #fcd856, #bdbbb1)',
          opacity: isEditMode ? '0.7' : '1',
          // top: isEditMode ? '80px' : '0px',
        }}
      />

      <InputBlock style={{ display: isEditMode ? 'block' : 'none' }}>
        {chiefAvator ? <P>選擇其他圖片</P> : <P>點選以新增圖片</P>}
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
    </Wrapper>
  );
};

export default VillageImageBlock;
