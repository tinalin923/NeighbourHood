/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { useEditState } from '../components/contexts/EditContext.js';
import AvatorImageBlock from '../components/Edit/AvatorImageInput.js';
import TextInfo from '../components/Edit/TextInfo.js';
import { Title, Main, ImgArea } from '../styles/styledComponents/block.js';

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
    <div name="1">
      <Title>里長介紹</Title>
      <Main>
        <ImgArea>
          <AvatorImageBlock />
          <Name
            type="text"
            placeholder="里長姓名"
            value={chiefName}
            style={{
              border: isEditMode ? '2px solid gray' : 'none',
              top: isEditMode ? '-19vh' : '0vh',
            }}
            readOnly={!isEditMode}
            onChange={(e) => setChiefName(e.target.value)}
          />
        </ImgArea>
        <TextInfo />
        {/* <TextInfo  placeholder={}, width, height, value, setValue/> */}
      </Main>
    </div>
  );
}
