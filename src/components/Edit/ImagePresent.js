import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Img = styled.img`
  margin: 52px 0px;
  width: 100%;
  border: 2px solid white;
`;

function ImagePresent({ name, src }) {
  return <Img src={src} alt={name} />;
}
ImagePresent.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default ImagePresent;
