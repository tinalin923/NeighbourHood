import React from 'react';
import useStorage from '../hooks/useStorage.js';

// eslint-disable-next-line react/prop-types
const ProgressBar = ({ file }) => {
  const { url, progress } = useStorage(file);
  // eslint-disable-next-line no-console
  console.log(url, progress);
  return <div className="bar">progress</div>;
};
export default ProgressBar;
