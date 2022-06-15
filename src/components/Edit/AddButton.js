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
  margin: ${(prop) => prop.margin};
  width: 100%;
  height: 100%;
  min-height: 10vh;
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
  &: hover {
    background: ${secondaryYellow};
    color: ${primaryGray};
    svg path {
      fill: ${primaryGray};
    }
  }
`;

const icon = {
  margin: '8px',
};

const AddButton = ({ name, setShow, margin }) => {
  const handleClick = () => {
    setShow(true);
  };
  return (
    <Div margin={margin}>
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
  margin: PropTypes.string,
};
AddButton.defaultProps = {
  margin: '12px 0',
};

export default AddButton;
