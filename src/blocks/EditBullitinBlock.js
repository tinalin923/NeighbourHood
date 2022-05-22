import React, { useState } from 'react';
import { useEditState } from '../components/contexts/EditContext.js';
import AvatorImageBlock from '../components/Edit/AvatorImageInput.js';
import TextInfo from '../components/Edit/TextInfo.js';
import {
  Block,
  Main,
  Title,
  SecondaryBtn,
} from '../styles/styledComponents/blockComponents.js';

export default function EditBullitinBlock() {
  const { announceList, addAnnounceList } = useEditState();
  const [announceTitle, setAnnounceTitle] = useState('');
  const [announceDetails, setAnnounceDetails] = useState('');

  const handleClick = () => {
    addAnnounceList(announceList.length, announceTitle, announceDetails);
    setAnnounceTitle('');
    setAnnounceDetails('');
  };

  return (
    <Block>
      <Title>新增公告事項</Title>
      <Main>
        <div style={{ display: 'block', textAlign: 'center' }}>
          <TextInfo
            placeholder="公告標題"
            value={announceTitle}
            setValue={setAnnounceTitle}
            height="10vh"
          />
          <AvatorImageBlock />
        </div>
        <div style={{ display: 'block', textAlign: 'center' }}>
          <TextInfo
            placeholder="詳細公告說明"
            value={announceDetails}
            setValue={setAnnounceDetails}
          />
          <SecondaryBtn
            disabled={announceTitle === ''}
            type="button"
            onClick={() => handleClick()}
          >
            點擊新增公告
          </SecondaryBtn>
        </div>
      </Main>
    </Block>
  );
}
