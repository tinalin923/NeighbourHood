import React from 'react';
import { useEditState } from '../contexts/EditContext.js';

const Switch = () => {
  const { editMode, setEditMode } = useEditState();
  const handleChange = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div className={editMode ? 'switch' : 'switch_on'}>
      <button className="switch_btn" type="button" onClick={handleChange} />
    </div>
  );
};
export default Switch;
