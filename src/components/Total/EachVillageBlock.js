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
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow: hidden;
`;

function EachVillageBlock({ id, cityName, villageName, heroImage }) {
  return (
    <VillageButton as={RouteLink} to={`/total/${id}`}>
      <div>
        <div
          style={{
            margin: '16px 16px 8px 16px',
            fontSize: '1.5rem',
            position: 'relative',
          }}
        >
          {villageName}
          <div style={{ position: 'absolute', top: '0', right: '0' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-more-horizontal"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </div>
        </div>
        <div
          style={{
            margin: '0px 16px 8px 16px',
            opacity: '0.8',
          }}
        >
          <FontAwesomeIcon
            icon={solid('location-dot')}
            style={{ marginRight: '18px' }}
          />
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
