import imageCompression from 'browser-image-compression';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ProgressBar from './Progressbar.js';

const InputBlock = styled.div`
  width: 20%;
  margin: 10px auto;
  padding: 4rem 8rem;
  display: inline-block;
  border: 3px solid #333333;
  font-size: 2.5rem;
  border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
  text-transform: uppercase;
  letter-spacing: 0.3ch;
  background: #ffffff;
  position: relative;

  &::before {
    content: '';
    border: 2px solid #353535;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg);
    border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%;
  }
`;

const P = styled.div`
  margin-top: 20px;
  padding: 10px;
  text-align: center;
  backgroung-color: white;
  opacity: 0.5;
  font-weight: bold;
`;
const Label = styled.label`
  display: block;
  margin: 10px auto;
  border: 1px solid #d6d3d3df;
  border-radius: 100%;
  width: 60px;
  height: 60px;
  &:hover {
    background-color: black;
    border: 1px solid black;
  }
  &:hover > svg > line {
    stroke: white;
  }
`;

const Input = styled.input`
  display: none;
`;

const HeroImage = styled.img`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 80px;
  z-index: -1;
  opacity: 0.5;
`;

const UploadForm = () => {
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [coverContainerStyle, setCoverContainerStyle] = useState('');
  const fileInput = useRef();
  const handleImageUpload = () => {
    const imageFile = fileInput.current.files[0];
    const imageFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (imageFile && imageFileTypes.includes(imageFile.type)) {
      setError(null);
    } else {
      setFile('');
      setError('請選擇照片檔案(.jpeg 或 .png)');
    }

    console.log(imageFile);
    const options = {
      maxSizeMB: 0.6,
      maxWidthOrHeight: 1080,
    };
    imageCompression(imageFile, options)
      .then((compressedImage) => {
        // compressedImage 為一Blob物件
        const compressedImageURL = URL.createObjectURL(compressedImage);
        //  compressedImageURL為一 blob+localhost開頭的url
        setImageUrl(compressedImageURL);
        // URL.revokeObjectURL(compressedImageURL);  加了會讓我無法呈現出來
      })
      .catch((err) => {
        setError(err);
      });
  };

  useEffect(() => {
    const coverStyle = {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };
    setCoverContainerStyle(coverStyle);
  }, [imageUrl]);

  return (
    <>
      <InputBlock>
        {imageUrl ? <P>選擇其他照片</P> : <P>請點選以新增封面</P>}
        <Label htmlFor="file">
          <svg width="60" height="60">
            <line x1="29" y1="19" x2="29" y2="39" />
            <line x1="19" y1="29" x2="39" y2="29" />
          </svg>
          <Input
            ref={fileInput}
            id="file"
            type="file"
            accept=".jpg, .png, .jpeg"
            // eslint-disable-next-line react/jsx-no-bind
            onChange={handleImageUpload}
          />
        </Label>
      </InputBlock>
      <div id="upload_btn_output">
        {error && <div className="upload_btn_error">{error}</div>}
        {file && <div className="upload_btn_filename">{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
        {imageUrl && <HeroImage style={coverContainerStyle} />}
      </div>
    </>
  );
};

export default UploadForm;
