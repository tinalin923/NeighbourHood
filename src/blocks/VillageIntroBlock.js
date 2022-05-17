import React from 'react';
import BlockImg from '../components/Edit/BlockImg.js';
import BlockInfo from '../components/Edit/BlockInfo.js';
import BlockMain from '../components/Edit/BlockMain.js';
import BlockTitle from '../components/Edit/BlockTitle.js';
import VillageImageBlock from '../components/Edit/VillageImageInput.js';

export default function VillageIntroBlock() {
  return (
    <>
      <div name="2" />
      <BlockTitle>村里介紹</BlockTitle>
      <BlockMain>
        <BlockInfo />
        <BlockImg>
          <VillageImageBlock />
        </BlockImg>
      </BlockMain>
    </>
  );
}
