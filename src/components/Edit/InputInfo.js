/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useEditState } from '../contexts/EditContext.js';

const Input = styled.input`
  margin: 10px auto;
  position: relative;
  width: 80%;
  padding: 8px;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  outline: none;
`;

const InputInfo = ({ placeholder, value, setValue, width, top }) => {
  const { isEditMode } = useEditState();

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{
        width: width || '80%',
        top: isEditMode ? `${top}` || '0vh' : '0vh',
        border: isEditMode ? '2px solid gray' : 'none',
      }}
      readOnly={!isEditMode}
    />
  );
};

export default InputInfo;
