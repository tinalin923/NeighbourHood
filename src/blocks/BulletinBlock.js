import React from 'react';
import EventList from '../components/Edit/EventList.js';
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
        <EventList />
      </Main>
    </Block>
  );
}
