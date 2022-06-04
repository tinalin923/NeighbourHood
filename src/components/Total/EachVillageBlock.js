import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &: hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 10px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
`;

function EachVillageBlock({ id, cityName, villageName, heroImage }) {
  return (
    <VillageButton as={RouteLink} to={`/total/${id}`}>
      <div>
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
      </div>
      <ImageContainer>
        <img
          src={heroImage}
          alt={villageName}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </ImageContainer>
    </VillageButton>
  );
}

EachVillageBlock.propTypes = {
  id: PropTypes.string.isRequired,
  cityName: PropTypes.string.isRequired,
  villageName: PropTypes.string.isRequired,
  heroImage: PropTypes.string.isRequired,
};

export default EachVillageBlock;
