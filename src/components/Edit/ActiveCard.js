/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import React from 'react';
// import ImagePresent from './ImagePresent.js';
import styled from 'styled-components';

const CardContainer = styled(motion.div)`
  width: 100%;
  max-height: 92vh;
  position: relative;
  margin: auto;
  border-radius: 20px;
  display: block;
  background: #363636;

  @media (min-width: 600px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

const OpenImageContainer = styled(motion.div)`
  // max-width: 100%;
  max-height: 45vh;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;

  @media (min-width: 600px) {
    border-top-left-radius: 0px;
    border-bottom-right-radius: 20px;
    max-height: 100%;
    max-width: 60%;
  }
`;
const TextContainer = styled.div`
  max-height: 50vh;
  padding: 8px;
  overflow: hidden;

  @media (min-width: 600px) {
    max-height: 100%;
    width: 40%;
  }
`;

const Title = styled(motion.div)`
  word-break: break-word;
  max-height: 11vh;
  overflow: auto;
  @media (min-width: 600px) {
    max-height: 12vh;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-button {
    background: transparent;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.4);
    border: 1px solid #f5f5f5;
  }

  &::-webkit-scrollbar-track {
    box-shadow: transparent;
  }
`;
const Text = styled(Title)`
  margin: 16px 8px;
  max-height: 32vh;
  && {
    color: #f5f5f5;
  }
  @media (min-width: 600px) {
    margin: 24px 8px;
    max-height: 70vh;
  }
`;

export default function ActiveCard({ activity, setActive }) {
  // filter出來的是一array
  const { id, title, details, picture } = activity[0];
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, delay: 0.15 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };
  return (
    <>
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          zIndex: '2',
          position: 'fixed',
          background: 'rgba(0,0,0,0.5)',
          width: '100%',
          top: '0',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        onClick={() => setActive(null)}
      />
      <div // .card-content-container.open
        style={{
          position: 'fixed',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: '2',
          width: '80%',
          maxWidth: '1100px',
          // height: '85%',
          // display: 'flex',
          // alignItems: 'center',
        }}
      >
        <CardContainer // card-content
          layoutId={`activity-${id}`}
        >
          <OpenImageContainer
            layoutId={`image-${id}`} // card-image-container
          >
            <img
              alt={title}
              src={picture}
              style={{ objectFit: 'fill', width: '100%', height: '100%' }}
            />
          </OpenImageContainer>
          <TextContainer>
            <Title layoutId={`title-${id}`}>
              <h3 style={{ color: '#f5f5f5' }}>{title}</h3>
            </Title>
            <Text animate>{details}</Text>
          </TextContainer>
        </CardContainer>
      </div>
    </>
  );
}
