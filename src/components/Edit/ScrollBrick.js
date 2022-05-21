/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';

const Brick = styled.div`
  display: flex;
  margin: 5px 0px;
  cursor: pointer;
  :hover :nth-child(1) {
    border: 2px solid #363945;
  }
  :hover :nth-child(2) {
    opacity: 1;
  }
  &.active {
    div:nth-of-type(1) {
      border: 2px solid #fcd856;
      background-color: #fcd856;
    }
  }
`;

const BrickIcon = styled.div`
  border: 1px solid #363945;
  background-color: #363945;
  height: 20px;
  width: 2px;
`;

const BrickText = styled.div`
  width: 60px;
  font-size: 0.7rem;
  color: #363945;
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
