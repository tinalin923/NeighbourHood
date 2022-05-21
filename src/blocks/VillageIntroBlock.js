import React from 'react';
import TextInfo from '../components/Edit/TextInfo.js';
import VillageImageBlock from '../components/Edit/VillageImageInput.js';
import {
  Block,
  Title,
  Main,
  ImgArea,
} from '../styles/styledComponents/blockComponents.js';

export default function VillageIntroBlock() {
  return (
    <Block name="2">
      <Title>村里介紹</Title>
      <Main>
        {/* <TextInfo  placeholder={}, width, height, value, setValue/> */}
        <TextInfo />
        <ImgArea>
          <VillageImageBlock />
        </ImgArea>
      </Main>
    </Block>
  );
}
