/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import ImagePresent from './ImagePresent.js';

export default function ActiveCard({ activity }) {
  const { id, title, details, picture } = activity;
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.15 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        style={{
          pointerEvents: 'auto',
          zIndex: '1',
          position: 'fixed',
          background: 'rgba(0, 0, 0, 0.8)',
        }}
        // className="overlay"
      />

      <motion.div layoutId={id}>
        <ImagePresent name="activityImage" src={picture} />
        <h4>{title}</h4>
        <h5>{details}</h5>
      </motion.div>
    </>
  );
}
