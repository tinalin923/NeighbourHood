/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useEditState } from '../contexts/EditContext.js';
import { backgroundGray } from '../../styles/styledComponents/color.js';

const Text = styled.textarea`
  margin: 2px 0;
  padding: 8px;
  overflow: auto;
  line-height: 1.5rem;
  border: none;
  border-bottom: 2px solid ${backgroundGray};
  background: transparent;
  color: ${backgroundGray};
  // @media (max-width: 600px) {
  //   width: 70vw;
  // } ;
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
    width: width || '90%',
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
