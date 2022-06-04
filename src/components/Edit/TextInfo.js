/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useEditState } from '../contexts/EditContext.js';

const Text = styled.textarea`
  margin: 1vh 0;
  padding: 10px;
  text-align: left;
  line-height: 1.5rem;
  font-size: 1.1rem;
  max-width: 500px;
  @media (max-width: 600px) {
    width: 70vw;
  } ;
`;
// 此RWD方式只根據第一次載入時的螢幕大小
export default function TextInfo({
  name,
  placeholder,
  width,
  height,
  value,
  setValue,
}) {
  const { editMode } = useEditState();
  // const []
  const commonStyle = {
    height: height || '50vh',
    width: width || '60vw',
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
      name={name}
      placeholder={placeholder}
      value={value ? value[name] : ''}
      onChange={(e) =>
        setValue((prev) => ({ ...prev, [name]: e.target.value }))
      }
      style={commonStyle}
      readOnly={!editMode}
    />
  );
}
