import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useEditState } from '../contexts/EditContext.js';
import { thirdGray } from '../../styles/styledComponents/color.js';

const Text = styled.textarea`
  margin: 4px 0;
  padding: 20px;
  text-align: left;
  line-height: 1.5rem;
  font-size: 1.2rem;
  max-width: 500px;
  border-radius: 4px;
  @media (max-width: 600px) {
    width: 70vw;
  } ;
`;
function TextInfo({ name, placeholder, width, height, value, setValue }) {
  const { editMode } = useEditState();
  const commonStyle = {
    height: height || '60vh',
    width: width || '60vw',
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
  width: '60vw',
  height: '60vh',
};

export default TextInfo;
