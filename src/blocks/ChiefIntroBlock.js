/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useEditState } from '../components/contexts/EditContext.js';
import BlockImg from '../components/Edit/BlockImg.js';
import BlockInfo from '../components/Edit/BlockInfo.js';
import BlockMain from '../components/Edit/BlockMain.js';
import BlockTitle from '../components/Edit/BlockTitle.js';
import AvatorImageBlock from '../components/Edit/AvatorImageInput.js';

const Name = styled.input`
  margin-top: 10px;
  position: relative;
  width: 80%;
  padding: 10px;
  font-weight: bold;
  font-size: 1.4rem;
  text-align: center;
  outline: none;
`;

export default function ChiefIntroBlock() {
  const { isEditMode, chiefName, setChiefName } = useEditState();
  // const nameRef = useRef(null);

  // const blurHandle = () => {
  //  console.log(nameRef.current.value);
  // };

  return (
    <>
      <BlockTitle>里長介紹</BlockTitle>
      <BlockMain>
        <BlockImg>
          <AvatorImageBlock />
          <Name
            type="text"
            // ref={nameRef}
            placeholder="里長姓名"
            value={chiefName}
            style={{
              border: isEditMode ? '2px solid gray' : 'none',
              top: isEditMode ? '-19vh' : '0vh',
            }}
            readOnly={!isEditMode}
            onChange={(e) => setChiefName(e.target.value)}
            // onBlur={blurHandle}
          />
        </BlockImg>
        <BlockInfo />
      </BlockMain>
    </>
  );
}
