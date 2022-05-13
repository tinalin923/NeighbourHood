import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import styled from 'styled-components';
import ProgressBar from './Progressbar.js';

const Label = styled.label`
  display: block;
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

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/jpeg', 'image/png'];
  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile && types.includes(imageFile.type)) {
      setError(null);
    } else {
      setFile('');
      setError('請選擇照片檔案(.jpeg 或 .png)');
    }
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1080,
    };
    try {
      const compressedFile = imageCompression(imageFile, options);
      setFile(compressedFile);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Label htmlFor="file">
        <svg width="60" height="60">
          <line x1="29" y1="19" x2="29" y2="39" />
          <line x1="19" y1="29" x2="39" y2="29" />
        </svg>
        <Input id="file" type="file" onChange={handleImageUpload} />
      </Label>
      <div className="upload_btn_output">
        {error && <div className="upload_btn_error">{error}</div>}
        {file && <div className="upload_btn_filename">{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </>
  );
};

export default UploadForm;
