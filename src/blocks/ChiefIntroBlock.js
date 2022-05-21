/* eslint-disable no-unused-vars */
import React from 'react';
import { useEditState } from '../components/contexts/EditContext.js';
import AvatorImageBlock from '../components/Edit/AvatorImageInput.js';
import TextInfo from '../components/Edit/TextInfo.js';
import InputInfo from '../components/Edit/InputInfo.js';
import {
  Block,
  ImgArea,
  Main,
  Title,
} from '../styles/styledComponents/blockComponents.js';

export default function ChiefIntroBlock() {
  const { chiefName, setChiefName, chiefInfo, setChiefInfo } = useEditState();

  return (
    <Block name="1">
      <Title>里長介紹</Title>
      <Main>
        <ImgArea>
          <AvatorImageBlock />
          <InputInfo
            placeholder="里長姓名"
            value={chiefName}
            setValue={setChiefName}
            top="-19vh"
          />
        </ImgArea>
        <TextInfo
          placeholder="請輸入介紹內容"
          value={chiefInfo}
          setValue={setChiefInfo}
        />
      </Main>
    </Block>
  );
}
