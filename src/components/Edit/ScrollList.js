import React from 'react';
import styled from 'styled-components';
import { useEditState } from '../contexts/EditContext.js';
import ScrollBrick from './ScrollBrick.js';

const BrickContainer = styled.div`
  z-index: 99;
  position: fixed;
  top: 50vh;
  left: 6vw;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 80px;
  @media (max-width: 600px) {
    left: 16vw;
  }
`;

export default function ScrollList() {
  const { scrollList, addScrollList } = useEditState();
  return (
    <BrickContainer>
      {scrollList.map(({ id, title }) => (
        <ScrollBrick key={id} to={id} title={title} />
      ))}
      <ScrollBrick
        onClick={() => addScrollList(scrollList.length)}
        to={scrollList.length.toString()}
      />
    </BrickContainer>
  );
}
