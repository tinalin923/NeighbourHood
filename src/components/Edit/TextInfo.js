import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { useEditState } from '../contexts/EditContext.js';
import { thirdGray } from '../../styles/styledComponents/color.js';

const Text = styled.textarea`
  padding: 20px;
  text-align: left;
  line-height: 1.5;
  font-size: 1.2rem;
  border-radius: 4px;
  border: ${(props) => (props.editMode ? `1px solid ${thirdGray}` : 'none')};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;
function TextInfo({ name, placeholder, width, height, value, setValue }) {
  const { editMode } = useEditState();
  return (
    <Text
      name={name}
      placeholder={placeholder}
      value={value ? value[name] : ''}
      onChange={(e) =>
        setValue((prev) => ({ ...prev, [name]: e.target.value }))
      }
      editMode={editMode}
      height={height}
      width={width}
      readOnly={!editMode}
    />
  );
}

TextInfo.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

TextInfo.defaultProps = {
  value: null,
  width: '100%',
  height: '100%',
};

export default TextInfo;
