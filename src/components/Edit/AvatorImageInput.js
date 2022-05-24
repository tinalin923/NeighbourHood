import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getStorageImages } from '../../hooks/firebase/useStorageData.js';
import { Error } from '../../styles/styledComponents/blockComponents.js';
import compressImage from '../../utils/imageCompress.js';
import { useAuthState } from '../contexts/AuthContext.js';
import { useEditState } from '../contexts/EditContext.js';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChiefAvatorImage = styled.div`
  height: 50vh;
  width: 30vw;
  aspect-ratio: 3/4;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 600px) {
    width: 60vw;
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

const AvatorImageInput = () => {
  const { currentUid } = useAuthState();
  const {
    published,
    isEditMode,
    setImageList,
    imagePathList,
    setImagePathList,
  } = useEditState();
  const [temporaryChiefAvator, setTemporaryChiefAvator] = useState();
  const [chiefAvatorError, setChiefAvatorError] = useState(null);
  const fileInput = useRef();

  useEffect(() => {
    if (!imagePathList?.chiefAvator) {
      console.log('bye2');
      return;
    }
    if (!published) return;
    getStorageImages(imagePathList.chiefAvator).then((storedUrl) => {
      setTemporaryChiefAvator(storedUrl);
    });
  });

  const handleImageUpload = async () => {
    const imageFile = fileInput.current.files[0];
    const imageFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (imageFile && imageFileTypes.includes(imageFile.type)) {
      setChiefAvatorError(null);
    } else {
      setChiefAvatorError('請選擇照片檔案(.jpeg 或 .png)');
    }
    // compressedImage 為一Blob物件
    const compressedImage = await compressImage(imageFile, 1280);
    console.log(compressedImage.name);
    setImageList((prev) => ({ ...prev, chiefAvator: compressedImage }));
    setImagePathList((prev) => ({
      ...prev,
      chiefAvator: `${currentUid}/${compressedImage.name}`,
    }));
    const compressedImageURL = URL.createObjectURL(compressedImage);
    //  compressedImageURL為一 blob+localhost開頭的url
    setTemporaryChiefAvator(compressedImageURL);
  };

  return (
    <Wrapper>
      <ChiefAvatorImage
        style={{
          backgroundImage: temporaryChiefAvator
            ? `url(${temporaryChiefAvator})`
            : 'linear-gradient(-45deg, #fcd856, #bdbbb1)',
          opacity: isEditMode ? '0.7' : '1',
          // top: isEditMode ? '80px' : '0px',
        }}
      >
        {chiefAvatorError && (
          <Error style={{ display: isEditMode ? 'block' : 'none' }}>
            {chiefAvatorError}
          </Error>
        )}
      </ChiefAvatorImage>

      <InputBlock style={{ display: isEditMode ? 'block' : 'none' }}>
        {temporaryChiefAvator ? <P>選擇其他圖片</P> : <P>點選以新增圖片</P>}
        <IconContainer>
          <FontAwesomeIcon icon={solid('plus')} style={icon} />
        </IconContainer>
        <input
          ref={fileInput}
          type="file"
          accept=".jpg, .png, .jpeg"
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </InputBlock>
    </Wrapper>
  );
};

export default AvatorImageInput;
