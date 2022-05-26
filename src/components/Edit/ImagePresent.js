/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  margin: 52px 0px;
  width: 100%;
  border: 2px solid white;
`;

export default function ImagePresent({ name, src }) {
  return <Img src={src} alt={name} />;
}
