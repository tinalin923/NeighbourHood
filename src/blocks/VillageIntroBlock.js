import React from 'react';
import TextInfo from '../components/Edit/TextInfo.js';
import {
  Block,
  Title,
  Main,
  ImgArea,
} from '../styles/styledComponents/blockComponents.js';
import { useEditState } from '../components/contexts/EditContext.js';
import SingleImageBlock from '../components/Edit/SingleImageBlock.js';

export default function VillageIntroBlock() {
  const { introductionTextData, setIntroductionTextData } = useEditState();

  return (
    <Block name="2">
      <Title>村里介紹</Title>
      <Main>
        <TextInfo
          name="villageInfo"
          placeholder="請輸入村里介紹"
          value={introductionTextData}
          setValue={setIntroductionTextData}
        />
        <ImgArea>
          <SingleImageBlock name="villageImage" />
        </ImgArea>
      </Main>
    </Block>
  );
}
