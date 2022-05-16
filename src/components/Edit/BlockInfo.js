import React from 'react';
import styled from 'styled-components';

const Info = styled.textarea`
  margin: 10vh 10vw;
  height: 70vh;
  width: 35vw;
  padding: 10px;
  @media (max-width: 768px) {
    width: 70vw;
  } ;
`;
export default function BlockInfo() {
  return <Info />;
}
