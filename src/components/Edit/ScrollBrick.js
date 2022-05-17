/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';

const Brick = styled.div`
  display: flex;
  margin: 5px 0px;
  :hover :nth-child(1) {
    border: 2px solid #363945;
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
  font-size: 10px;
  color: #363945;
  opacity: 0;
  :hover {
    opacity: 0.9;
  }
`;
export default function ScrollBrick({ to, title }) {
  return (
    <Brick as={Link} to={to} spy smooth duration={500}>
      <BrickIcon />
      <BrickText>&nbsp;&nbsp;{title}</BrickText>
    </Brick>
  );
}
