import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propTypes from 'prop-types';
import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import styled from 'styled-components';

const VillageButton = styled.button`
  border-radius: 8px;
  background: #f5f5f5;
  width: 100%;
  height: 100%;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 5px;
  &: hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 10px;
  }
`;

const ImageContainer = styled.div`
  height: 60%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
      <div
        style={{
          margin: '16px',
          fontSize: '1.1rem',
        }}
      >
        <FontAwesomeIcon
          icon={solid('house-chimney-user')}
          style={{ marginRight: '18px' }}
        />
        {villageName}
      </div>
      <div
        style={{
          margin: '16px',
          fontSize: '0.9rem',
          opacity: '0.8',
        }}
      >
        {cityName}
      </div>
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
