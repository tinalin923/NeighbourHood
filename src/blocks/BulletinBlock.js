import React from 'react';
import AnnounceList from '../components/Edit/AnnounceList.js';
import {
  Block,
  Main,
  Title,
} from '../styles/styledComponents/blockComponents.js';

export default function BulletinBlock() {
  return (
    <Block name="3">
      <Title>公佈欄</Title>
      <Main>
        <AnnounceList />
      </Main>
    </Block>
  );
}
