/* eslint-disable react/prop-types */
import React from 'react';
import { useEditState } from '../contexts/EditContext.js';

const InputInfo = ({ name, placeholder, value, setValue, width, top }) => {
  const { isEditMode } = useEditState();

  return (
    <input
      name={name}
      type="text"
      placeholder={placeholder}
      value={value ? value[name] : ''}
      onChange={(e) =>
        setValue((prev) => ({ ...prev, [name]: e.target.value }))
      }
      style={{
        margin: '10px auto',
        position: 'relative',
        padding: '8px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        textAlign: 'center',
        outline: 'none',
        width: width || '80%',
        top: isEditMode ? `${top}` || '0vh' : '0vh',
        border: isEditMode ? '2px solid gray' : 'none',
      }}
      readOnly={!isEditMode}
    />
  );
};

export default InputInfo;
