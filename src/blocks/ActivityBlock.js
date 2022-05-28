import React from 'react';
import {
  Block,
  Title,
  Main,
} from '../styles/styledComponents/blockComponents.js';
import ActivityList from '../components/Edit/ActivityList.js';

function ActivityBlock() {
  return (
    <Block name="4">
      <Title>活動</Title>
      <Main>
        <ActivityList />
      </Main>
    </Block>
  );
}

export default ActivityBlock;
