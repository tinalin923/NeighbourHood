/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useEditState } from '../contexts/EditContext.js';

const Text = styled.textarea`
  margin: 1vh 3vw;
  padding: 10px;
  overflow: auto;
  @media (max-width: 600px) {
    margin-top: 5vh;
    width: 70vw;
  } ;
`;
// 此RWD方式只根據第一次載入時的螢幕大小
export default function TextInfoForEdit({
  placeholder,
  width,
  height,
  value,
  setValue,
}) {
  const { editMode } = useEditState();
  const commonStyle = {
    height: height || '60vh',
    width: width || '80%',
    border: editMode ? '2px solid gray' : 'none',
  };
  // let responsiveStyle;
  // if (window.innerWidth > 600) {
  //   responsiveStyle = {
  //     width: width || '35%',
  //   };
  // } else {
  //   responsiveStyle = {
  //     width: width || '70%',
  //   };
  // }
  // const style = { ...commonStyle, ...responsiveStyle };
  return (
    <Text
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={commonStyle}
      readOnly={!editMode}
    />
  );
}
