import PropTypes from 'prop-types';
import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const Explanation = styled.div`
  height: 40vh;
  width: 90vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 600px) {
    height: 80vw;
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const Text = styled.div`
  width: 40vw;
  margin: auto;
  margin-right: 0px;
  @media (max-width: 600px) {
    margin-right: auto;
    width: 80vw;
  }
`;
const Video = styled(Text)`
  height: inherit;
  margin-right: auto;

  @media (max-width: 600px) {
    height: auto;
  }
`;

const Title = styled.div`
  margin: 4px auto;
  text-align: left;
  font-size: 2rem;
  font-weight: bold;
  @media (max-width: 600px) {
    text-align: center;
    font-size: 1.5rem;
  }
`;
const Details = styled(Title)`
  font-size: 1.5rem;
  font-weight: normal;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

function Section({ step, name, title, details, url, startColor, endColor }) {
  const type = `#${name}`;
  const id = `url(${type})`;
  console.log(type);
  return (
    <div
      style={{
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          width: '150px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <svg
          style={{ height: '80%' }}
          id="svg_css_ex1"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={name} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
          </defs>
          <path fill={id} d="M49.5,41  L49.5,100 L50.5,100 L50.5,41 " />
        </svg>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '100%',
            backgroundImage: `linear-gradient(to right, ${startColor} 0%, ${endColor} 100%)`,
            color: 'white',
            textAlign: 'center',
            lineHeight: '39px',
            fontFamily: 'Kanit, sans-serif',
          }}
        >
          {step}
        </div>

        <div
          style={{
            fontFamily: 'Kanit, sans-serif',
            fontSize: '2.5rem',
            color: 'black',
          }}
        >
          {name}
        </div>
      </div>
      <Explanation>
        <Video>
          <ReactPlayer
            url={url}
            loop
            playing
            width="100%"
            height="100%"
            controls={false}
          />
        </Video>
        <Text>
          <Title>{title}</Title>
          <Details>{details}</Details>
        </Text>
      </Explanation>
    </div>
  );
}

Section.propTypes = {
  step: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  startColor: PropTypes.string.isRequired,
  endColor: PropTypes.string.isRequired,
};

export default Section;
