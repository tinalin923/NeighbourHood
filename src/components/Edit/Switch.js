import React from 'react';
import { useEditState } from '../contexts/EditContext.js';

const Switch = () => {
  const { isEditMode, toggleEditMode } = useEditState();
  const handleChange = () => {
    toggleEditMode();
  };

  return (
    <div className={isEditMode ? 'switch' : 'switch_on'}>
      <button className="switch_btn" type="button" onClick={handleChange} />
    </div>
  );
};
export default Switch;
