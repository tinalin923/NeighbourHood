import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  primaryYellow,
  secondaryGray,
} from '../../styles/styledComponents/color.js';
import { useEditState } from '../contexts/EditContext.js';

const icon = {
  position: 'relative',
  right: '0',
  color: '#939393',
  '&:hover': {
    color: '#535353',
  },
};

export default function EventList() {
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
  const {
    isEditMode,
    announcePresentList,
    deleteAnnounceList,
    deleteAnnouncePresentList,
  } = useEditState();
  const [activeItem, setActiveItem] = useState(0);

  // for 動畫
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
      {announcePresentList.map(({ id, title, details, picture }) => (
        <div
          key={id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <motion.button
            variants={containerVariants}
            animate={activeItem === id ? 'visible' : 'hidden'}
            whileHover={{
              background: `${primaryYellow}`,
              transition: { duration: 0.1 },
            }}
            style={{
              flex: 'none',
              width: isEditMode ? '92%' : '99%',
              margin: '16px 0px',
              outline: 'none',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 20px',
              background: `${secondaryGray}`,
              fontSize: '1.5rem',
              color: '#ffffff',
            }}
            type="button"
            onClick={() => handleClick(id)}
          >
            <div style={{ textAlign: 'right' }}>{title}</div>
            <motion.div
              variants={eventVariants}
              animate={activeItem === id ? 'visible' : 'hidden'}
              style={{ textAlign: 'left', color: '#000' }}
            >
              {details}
              <br />
              {picture && <img src={picture} alt="announceImage" />}
            </motion.div>
          </motion.button>
          <button
            type="button"
            onClick={() => {
              deleteAnnouncePresentList(id);
              deleteAnnounceList(id);
            }}
            style={{
              width: '28px',
              height: '28px',
              background: 'none',
              display: isEditMode ? 'block' : 'none',
            }}
          >
            <FontAwesomeIcon icon={solid('trash')} style={icon} />
          </button>
        </div>
      ))}
    </div>
  );
}
