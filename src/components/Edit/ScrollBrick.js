/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import {
  primaryGray,
  primaryYellow,
} from '../../styles/styledComponents/color.js';

const Brick = styled.div`
  display: flex;
  margin: 5px 0px;
  cursor: pointer;
  :hover :nth-child(1) {
    border: 2px solid ${primaryGray};
  }
  :hover :nth-child(2) {
    opacity: 1;
  }
  &.active {
    div:nth-of-type(1) {
      border: 2px solid ${primaryYellow};
      background-color: ${primaryYellow};
    }
  }
`;

const BrickIcon = styled.div`
  border: 1px solid ${primaryGray};
  background-color: ${primaryGray};
  height: 20px;
  width: 2px;
`;

const BrickText = styled.div`
  width: 60px;
  font-size: 0.7rem;
  color: ${primaryGray};
  opacity: 0;
`;
export default function ScrollBrick({ to, title }) {
  return (
    <Brick as={Link} to={to} spy smooth duration={400} isDynamic>
      <BrickIcon />
      <BrickText>&nbsp;&nbsp;{title}</BrickText>
    </Brick>
  );
}
