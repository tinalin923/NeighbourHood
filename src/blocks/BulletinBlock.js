import React from 'react';
import PropTypes from 'prop-types';
import AnnounceList from '../components/Edit/AnnounceList.js';
import {
  Block,
  Main,
  Title,
} from '../styles/styledComponents/blockComponents.js';

function BulletinBlock({ name }) {
  return (
    <Block name={name}>
      <Title>公佈欄</Title>
      <Main>
        <AnnounceList />
      </Main>
    </Block>
  );
}

BulletinBlock.propTypes = {
  name: PropTypes.number.isRequired,
};

export default BulletinBlock;
