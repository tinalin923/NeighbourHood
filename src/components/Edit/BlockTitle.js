import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  margin-top: 5vh;
  padding: 10px;
  font-size: 1.3rem;
  font-weight: bold;
  height: 10vh;
`;
// eslint-disable-next-line react/prop-types
export default function BlockTitle({ children }) {
  return <Title>{children}</Title>;
}
