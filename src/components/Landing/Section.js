import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

const Title = styled.h3``;
const Details = styled.div``;

function Section({ title, details }) {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <ReactPlayer
          url="https://streamable.com/5gi30m"
          loop
          playing
          width="100%"
          height="100%"
        />
      </div>
      <div />
      <div>
        <Title>{title}</Title>
        <Details>{details}</Details>
      </div>
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
};

export default Section;
