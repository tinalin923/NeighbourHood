import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  primaryYellow,
  secondaryGray,
} from '../../styles/styledComponents/color.js';
import { useEditState } from '../contexts/EditContext.js';

export default function EventBlock() {
  const containerVariants = {
    hidden: {
      scale: 1,
      transition: {
        type: 'spring',
        mass: 0.4,
        damping: 8,
        when: 'afterChildren',
        staggerChildren: 2,
        duration: 1,
        delay: 0.2,
      },
    },
    visible: {
      scale: 1.02,
      originY: 0,
      transition: {
        type: 'spring',
        mass: 0.4,
        damping: 8,
        when: 'beforeChildren',
        staggerChildren: 2,
        duration: 1,
      },
    },
  };

  const eventVariants = {
    hidden: {
      height: '0px',
      opacity: 0,
      y: '2vh',
      transition: {
        type: 'tween',
        // type: 'spring',
        // mass: 0.4,
        // damping: 8,
        duration: 0.1,
        // ease: 'easeOut',
      },
    },
    visible: {
      height: 'auto',
      opacity: 1,
      y: '0',
      transition: {
        type: 'tween',
        // type: 'spring',
        // mass: 0.4,
        // damping: 8,
        duration: 0.2,
        delay: 0.2,
      },
    },
  };

  const { announceList } = useEditState();

  const [activeItem, setActiveItem] = useState(0);
  const handleClick = (id) => {
    if (id === activeItem) {
      setActiveItem(null);
    } else {
      setActiveItem(id);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '85%',
        height: 'auto',
      }}
    >
      {announceList.map(({ id, title, picture, details }) => (
        <motion.button
          variants={containerVariants}
          animate={activeItem === id ? 'visible' : 'hidden'}
          whileHover={{
            background: `${primaryYellow}`,
            transition: { duration: 0.1 },
          }}
          style={{
            margin: '15px 0px',
            outline: 'none',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 30px',
            background: `${secondaryGray}`,
            fontSize: '1.5rem',
            color: '#ffffff',
          }}
          type="button"
          onClick={() => handleClick(id)}
          key={id}
        >
          <div style={{ padding: '10px 0px' }}>{title}</div>
          <motion.div
            variants={eventVariants}
            animate={activeItem === id ? 'visible' : 'hidden'}
            style={{ textAlign: 'left', color: '#000' }}
          >
            {picture} <br />
            {details}
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
}
