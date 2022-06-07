import React from 'react';
import { useEditState } from '../contexts/EditContext.js';

const Switch = () => {
  const { editMode, setEditMode } = useEditState();
  const handleChange = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <>
      <span
        style={{
          position: 'fixed',
          zIndex: '10',
          top: '95px',
          right: '20px',
          color: 'black',
        }}
      >
        編輯 / 預覽
      </span>
      <div className={editMode ? 'switch' : 'switch_on'}>
        <button className="switch_btn" type="button" onClick={handleChange} />
      </div>
    </>
  );
};
export default Switch;
