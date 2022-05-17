import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  margin-top: 5vh;
  padding: 10px 150px;
  font-size: 1.3rem;
  font-weight: bold;
  height: 10vh;
  @media (max-width: 600px) {
    padding: 10px 50px;
  }
`;
// eslint-disable-next-line react/prop-types
export default function BlockTitle({ children }) {
  return <Title>{children}</Title>;
}
