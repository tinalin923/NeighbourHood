import PropTypes from 'prop-types';
import React from 'react';
import { useEditState } from '../contexts/EditContext.js';
import { thirdGray } from '../../styles/styledComponents/color.js';

const InputInfo = ({ name, placeholder, value, setValue, width, top }) => {
  const { editMode } = useEditState();

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
        margin: '8px auto',
        position: 'relative',
        padding: '1rem',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        textAlign: 'center',
        outline: 'none',
        width: `${width}`,
        top: editMode ? `${top}` : '0vh',
        border: editMode ? `1px solid ${thirdGray}` : 'none',
        borderRadius: '4px',
      }}
      readOnly={!editMode}
    />
  );
};

InputInfo.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  width: PropTypes.string,
  top: PropTypes.string,
};
InputInfo.defaultProps = {
  width: '80%',
  top: '0vh',
};

export default InputInfo;
