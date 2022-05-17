import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  height: 90vh;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 160vh;
  }
`;
// eslint-disable-next-line react/prop-types
export default function BlockMain({ children }) {
  return <Main>{children}</Main>;
}
