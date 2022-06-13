import PropTypes from 'prop-types';
import React from 'react';
import { useEditState } from '../contexts/EditContext.js';
import { thirdGray } from '../../styles/styledComponents/color.js';

const InputInfo = ({ name, placeholder, value, setValue, width }) => {
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
        display: 'block',
        margin: '0px auto',
        padding: '1rem',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        textAlign: 'center',
        outline: 'none',
        width: `${width}`,
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
  value: PropTypes.object,
  setValue: PropTypes.func.isRequired,
  width: PropTypes.string,
};
InputInfo.defaultProps = {
  value: null,
  width: '100%',
};

export default InputInfo;
