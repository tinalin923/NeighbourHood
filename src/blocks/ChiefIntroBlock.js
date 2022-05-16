/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useEditState } from '../components/contexts/EditContext.js';
import BlockImg from '../components/Edit/BlockImg.js';
import BlockInfo from '../components/Edit/BlockInfo.js';
import BlockMain from '../components/Edit/BlockMain.js';
import BlockTitle from '../components/Edit/BlockTitle.js';
import SingleImageBlock from '../components/Edit/SingleImageInput.js';

const Name = styled.input`
  margin-top: 5px;
  position: relative;
  width: 80%;
  padding: 10px;
  font-weight: bold;
  font-size: 1.4rem;
  text-align: center;
  outline: none;
`;

export default function ChiefIntroBlock() {
  const { isEditMode, chiefAvator, chiefName, chiefInfo } = useEditState();
  const nameRef = useRef();
  const avatorRef = useRef();
  console.log(isEditMode);

  return (
    <>
      <BlockTitle>里長介紹</BlockTitle>
      <BlockMain>
        <BlockImg>
          <SingleImageBlock />
          <Name
            ref={nameRef}
            isEditMode={isEditMode}
            placeholder="里長姓名"
            style={{
              border: isEditMode ? '2px solid gray' : 'none',
              top: isEditMode ? '-19.8vh' : '0vh',
            }}
            readOnly={!isEditMode}
          />
        </BlockImg>
        <BlockInfo />
      </BlockMain>
    </>
  );
}
