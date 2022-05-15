import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import compressImage from '../../utils/imageCompress.js';
import { useEditState } from '../contexts/EditContext.js';

const InputBlock = styled.label`
  margin: 40px auto;
  width: 20%;
  border: 4px solid #8d92a5;
  border-radius: 40px;
  height: 140px;
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
  background-color: white;
  opacity: 0.5;
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const icon = {
  position: 'relative',
  opacity: '0.8',
};

const Input = styled.input`
  display: none;
`;

const OriginalHeroImage = styled.img`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 80px;
  z-index: -2;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: linear-gradient(-35deg, #e80c7a, #e85d2d);
`;

const HeroImageBlock = () => {
  const { isEditMode, heroImage, setHeroImage } = useEditState();
  // const [imageUrl, setImageUrl] = useState('');
  const [heroImageError, setHeroImageError] = useState('');
  // const [coverContainerStyle, setCoverContainerStyle] = useState('');
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

  // useEffect(() => {
  //   opacity: `${isEditMode ? '0.7' : '1'}`,
  //   let coverStyle;
  //   if (heroImage) {
  //     console.log(heroImage);
  //     coverStyle = {
  //       opacity: `${isEditMode ? '0.7' : '1'}`,
  //     };
  //   }
  //   console.log(heroImage);
  //   coverStyle = {
  //   };
  //   setCoverContainerStyle(coverStyle);
  // }, [heroImage, isEditMode]);

  return (
    <>
      <InputBlock style={{ display: isEditMode ? 'block' : 'none' }}>
        {heroImage ? <P>選擇其他照片</P> : <P>點選以新增封面</P>}
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
      <div id="upload_btn_output">
        {heroImageError && (
          <div className="upload_btn_error">{heroImageError}</div>
        )}
        {/* {file && <div className="upload_btn_filename">{file.name}</div>} */}
        {/* {file && <ProgressBar file={file} setFile={setFile} />} */}
        {!heroImage && (
          <OriginalHeroImage style={{ opacity: isEditMode ? '0.7' : '1' }} />
        )}
        {heroImage && (
          <NewHeroImage
            url={heroImage}
            style={{ opacity: isEditMode ? '0.7' : '1' }}
          />
        )}
      </div>
    </>
  );
};
const NewHeroImage = styled(OriginalHeroImage)`
  z-index: -1;
  background-image: url(${(prop) => prop.url});
`;
export default HeroImageBlock;
