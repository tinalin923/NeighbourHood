/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Info = styled.textarea`
  margin: 1vh 3vw;
  padding: 10px;
  @media (max-width: 600px) {
    margin-top: 5vh;
    width: 70vw;
  } ;
`;

export default function TextInfo({
  placeholder,
  width,
  height,
  value,
  setValue,
}) {
  return (
    <Info
      placeholder={placeholder}
      style={{ width: width || '35vw', height: height || '60vh' }} // 若沒有height 就回傳使用35vw
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
