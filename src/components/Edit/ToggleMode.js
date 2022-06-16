import React from 'react';
import styled from 'styled-components';
import { useEditState } from '../contexts/EditContext.js';
import { backgroundGray } from '../../styles/styledComponents/color.js';

const ToggleName = styled.span`
  position: fixed;
  z-index: 10;
  top: 84px;
  right: 20px;
  padding: 4px;
  border-radius: 4px;
  color: ${(props) => (props.editMode ? 'black' : `${backgroundGray}`)};
  background: ${(props) =>
    props.editMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)'};
`;
const ToggleMode = () => {
  const { editMode, setEditMode } = useEditState();
  const handleChange = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <>
      <ToggleName editMode={editMode}> 編輯 / 預覽 </ToggleName>
      <div className={editMode ? 'switch' : 'switch_on'}>
        <button className="switch_btn" type="button" onClick={handleChange} />
      </div>
    </>
  );
};

export default ToggleMode;
