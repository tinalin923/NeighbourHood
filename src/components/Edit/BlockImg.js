import React from 'react';
import styled from 'styled-components';

const ImgArea = styled.div`
  margin-top: 3vh;
  height: 70vh;
  width: 35vw;
  display: block;
  text-align: center;
  @media (max-width: 600px) {
    width: 80vw;
  } ;
`;

// eslint-disable-next-line react/prop-types
export default function BlockImg({ children }) {
  return <ImgArea>{children}</ImgArea>;
}
