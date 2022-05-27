import React from 'react';
import { useParams } from 'react-router-dom';

const EachPresent = () => {
  const { uid } = useParams();
  return <p>{uid}</p>;
};

export default EachPresent;
