import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
  primaryGray,
  primaryYellow,
  secondaryYellow,
} from '../../styles/styledComponents/color.js';

const Div = styled.div`
  margin: 12px;
  // width: ${(prop) => prop.width};
  // height: ${(prop) => prop.height};

  border: 4px solid ${primaryGray};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background: ${primaryGray};
  color: ${secondaryYellow};

  svg path {
    fill: ${primaryYellow};
  }
`;

const icon = {
  margin: '8px',
};

const AddButton = ({ name, setShow }) => {
  const handleClick = () => {
    setShow(true);
  };
  return (
    <Div>
      <Button type="button" onClick={() => handleClick()}>
        <FontAwesomeIcon icon={solid('square-plus')} style={icon} />
        新增{name}
      </Button>
    </Div>
  );
};

AddButton.propTypes = {
  name: PropTypes.string.isRequired,
  setShow: PropTypes.func.isRequired,
  // height: PropTypes.string.isRequire,
};
export default AddButton;
