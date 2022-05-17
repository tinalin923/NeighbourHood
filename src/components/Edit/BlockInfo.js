import React from 'react';
import styled from 'styled-components';

const Info = styled.textarea`
  margin: 1vh 3vw;
  height: 60vh;
  width: 35vw;
  padding: 10px;
  @media (max-width: 600px) {
    margin-top: 5vh;
    width: 70vw;
  } ;
`;
export default function BlockInfo() {
  return <Info />;
}
