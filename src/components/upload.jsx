// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import ProgressBar from './progressbar.js';

const UpLoadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/jpeg', 'image/png'];
  const changeHandler = (e) => {
    const selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError(null);
    } else {
      setFile('');
      setError('請選擇照片檔案(.jpeg 或 .png)');
    }
  };
  return (
    <>
      <label htmlFor="file" className="upload_btn_file">
        <svg width="60" height="60">
          <line x1="28" y1="18" x2="28" y2="38" />
          <line x1="18" y1="28" x2="38" y2="28" />
        </svg>
        <input
          id="file"
          type="file"
          className="upload_btn_input"
          onChange={changeHandler}
        />
      </label>
      <div className="upload_btn_output">
        {error && <div className="upload_btn_error">{error}</div>}
        {file && <div className="upload_btn_filename">{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </>
  );
};

export default UpLoadForm;
