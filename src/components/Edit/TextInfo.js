import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useEditState } from '../contexts/EditContext.js';
import { thirdGray } from '../../styles/styledComponents/color.js';

const Text = styled.textarea`
  padding: 20px;
  text-align: left;
  line-height: 1.5rem;
  font-size: 1.2rem;
  border-radius: 4px;
`;
function TextInfo({ name, placeholder, width, height, value, setValue }) {
  const { editMode } = useEditState();
  const commonStyle = {
    height: `${height}`,
    width: `${width}`,
    border: editMode ? `1px solid ${thirdGray}` : 'none',
  };
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

TextInfo.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

TextInfo.defaultProps = {
  width: '100%',
  height: '100%',
};

export default TextInfo;
