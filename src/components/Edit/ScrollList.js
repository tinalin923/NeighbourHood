import React from 'react';
import styled from 'styled-components';
import { useEditState } from '../contexts/EditContext.js';
import ScrollBrick from './ScrollBrick.js';

const BrickContainer = styled.div`
  z-index: 99;
  position: fixed;
  top: 50vh;
  left: 3vw;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
`;
export default function ScrollList() {
  const { scrollList, addScrollList } = useEditState();
  return (
    <>
      <BrickContainer>
        {scrollList.map(({ id, title }) => (
          <ScrollBrick key={id} to={id} title={title} />
        ))}
      </BrickContainer>
      <ScrollBrick onClick={() => addScrollList(scrollList.length)} />
    </>
  );
}
