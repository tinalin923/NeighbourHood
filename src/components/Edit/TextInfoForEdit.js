import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { backgroundGray } from '../../styles/styledComponents/color.js';
import { useEditState } from '../contexts/EditContext.js';

const Text = styled.textarea`
  margin: 2px 0;
  padding: 8px;
  overflow: auto;
  line-height: 1.5rem;
  border: none;
  border-bottom: 2px solid ${backgroundGray};
  background: transparent;
  color: ${backgroundGray};
`;
function TextInfoForEdit({ placeholder, width, height, value, setValue }) {
  const { editMode } = useEditState();
  const commonStyle = {
    height,
    width,
  };

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

TextInfoForEdit.propTypes = {
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  value: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
};
TextInfoForEdit.defaultProps = {
  width: '90%',
  height: '60vh',
};
export default TextInfoForEdit;
