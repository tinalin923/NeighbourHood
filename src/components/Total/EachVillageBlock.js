import React from 'react';
import propTypes from 'prop-types';
import { Link as RouteLink } from 'react-router-dom';
import styled from 'styled-components';

const VillageButton = styled.button`
  border-radius: 20px;
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  &: hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 10px;
  }
`;

const ImageContainer = styled.div`
  height: 60%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
`;

function EachVillageBlock({ id, cityName, villageName, heroImage }) {
  return (
    <VillageButton as={RouteLink} to={`/total/${id}`}>
      <ImageContainer>
        <img
          src={heroImage}
          alt={villageName}
          style={{ objectFit: 'fill', width: '100%', height: '100%' }}
        />
      </ImageContainer>
      <div>{cityName}</div>
      <div>{villageName}</div>
    </VillageButton>
  );
}

EachVillageBlock.propTypes = {
  id: propTypes.string.isRequired,
  cityName: propTypes.string.isRequired,
  villageName: propTypes.string.isRequired,
  heroImage: propTypes.string.isRequired,
};

export default EachVillageBlock;
