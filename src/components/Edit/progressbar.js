import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage.js';

const ProgressBar = (props) => {
  // eslint-disable-next-line react/prop-types
  const { file, setFile } = props;
  const { url, progress } = useStorage(file);
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);
  return (
    <div className="bar" style={{ width: `${progress}%` }}>
      {progress.toFixed()} %
    </div>
  );
};
export default ProgressBar;
