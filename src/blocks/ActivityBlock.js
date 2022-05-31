import React from 'react';
import PropTypes from 'prop-types';
import {
  Block,
  Title,
  Main,
} from '../styles/styledComponents/blockComponents.js';
import ActivityList from '../components/Edit/ActivityList.js';

function ActivityBlock({ name }) {
  return (
    <Block name={name}>
      <Title>活動</Title>
      <Main>
        <ActivityList />
      </Main>
    </Block>
  );
}
ActivityBlock.propTypes = {
  name: PropTypes.number.isRequired,
};
export default ActivityBlock;
