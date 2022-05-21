import React from 'react';
import AvatorImageBlock from '../components/Edit/AvatorImageInput.js';
import TextInfo from '../components/Edit/TextInfo.js';
import {
  Block,
  Main,
  Title,
} from '../styles/styledComponents/blockComponents.js';
// import { useEditState } from '../components/contexts/EditContext.js';

export default function EditBullitinBlock() {
  // const { } = useEditState();
  return (
    <Block>
      <Title>新增公告事項</Title>
      <Main>
        <div style={{ display: 'block', textAlign: 'center' }}>
          <TextInfo
            placeholder="公告標題"
            // value={chiefName}
            // setValue={setChiefName}
            height="10vh"
          />
          <AvatorImageBlock />
        </div>
        <TextInfo placeholder="詳細公告說明" />
      </Main>
    </Block>
  );
}
