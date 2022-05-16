import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  flex-direction: row;
  height: 90vh;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
// eslint-disable-next-line react/prop-types
export default function BlockMain({ children }) {
  return <Main>{children}</Main>;
}
