/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import React from 'react';
import ImagePresent from './ImagePresent.js';

export default function ActiveCard({ activity, setActive }) {
  // filter出來的是一array
  const { id, title, details, picture } = activity[0];
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, delay: 0.15 },
    },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };
  return (
    <>
      <motion.div
        variants={backgroundVariants}
        animate={id ? 'visible' : 'hidden'}
        style={{
          pointerEvents: 'auto',
          zIndex: '2',
          position: 'fixed',
          background: 'rgba(0,0,0,0.5)',
          width: '100%',
          top: '0',
          bottom: '0',
          // left: '50%',
          // transform: 'translateX(-50%)',
          maxWidth: '990px',
        }}
        // className="overlay"
      />

      <motion.div
        layoutId={id}
        style={{
          zIndex: '3',
          position: 'fixed',
          top: '0',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <ImagePresent name="activityImage" src={picture} />
        <h4>{title}</h4>
        <h5>{details}</h5>
        <motion.button
          onClick={() => setActive(null)}
          style={{
            border: '1px solid red',
            background: 'red',
          }}
        />
      </motion.div>
    </>
  );
}
