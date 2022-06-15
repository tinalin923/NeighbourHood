import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { ListTitle } from '../../styles/styledComponents/blockComponents.js';

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
  max-height: 50vh;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: auto;

  @media (min-width: 600px) {
    overflow: hidden;

    border-top-left-radius: 0px;
    border-bottom-right-radius: 20px;
    max-height: 100%;
    max-width: 60%;
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
const TextContainer = styled.div`
  max-height: 45vh;
  padding: 4px;
  @media (min-width: 600px) {
    max-height: 100%;
    width: 40%;
  }
`;

const Title = styled(motion.div)`
  margin: 1.5rem 8px 0px;

  word-break: break-word;
  max-height: 13vh;
  padding: 4px;
  overflow: auto;
  @media (min-width: 600px) {
    max-height: 13vh;
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
  margin: 1rem 8px 16px;
  max-height: 24vh;
  font-size: 1.2rem;
  line-height: 1.5;

  && {
    color: #f5f5f5;
  }
  @media (min-width: 600px) {
    margin: 24px 8px;
    max-height: 70vh;
  }
`;

function ActiveCard({ activity, setActive }) {
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
              <ListTitle style={{ color: '#f5f5f5' }}>{title}</ListTitle>
            </Title>
            <Text animate>{details}</Text>
          </TextContainer>
        </CardContainer>
      </div>
    </>
  );
}

ActiveCard.propTypes = {
  activity: PropTypes.array.isRequired,
  setActive: PropTypes.func.isRequired,
};
export default ActiveCard;
