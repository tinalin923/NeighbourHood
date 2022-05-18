import { motion } from 'framer-motion';
import React, { useState } from 'react';

export default function EventBlock() {
  const containerVariants = {
    hidden: {
      scale: 1,
      transition: {
        type: 'spring',
        mass: 0.4,
        damping: 8,
        when: 'beforeChildren',
        staggerChildren: 2,
      },
    },
    visible: {
      scale: 1.05,
      transition: {
        type: 'spring',
        mass: 0.4,
        damping: 8,
        when: 'beforeChildren',
        staggerChildren: 2,
      },
    },
  };

  const eventVariants = {
    hidden: {
      height: '0px',
      opacity: 0,
      transition: {
        type: 'spring',
        mass: 0.4,
        damping: 8,
      },
    },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        type: 'spring',
        mass: 0.4,
        damping: 8,
      },
    },
  };
  const Datas = [
    { id: 1, title: '垃圾車時間', explantion: '明天下午五點才會來' },
    {
      id: 2,
      title: '捐血活動',
      explantion: '在永康公園前的空地，欲參加者，請勿熬夜',
    },
  ];
  const [activeItem, setActiveItem] = useState(0);
  const handleClick = (id) => {
    if (id === activeItem) {
      setActiveItem(0);
    } else {
      setActiveItem(id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {Datas.map(({ id, title, explantion }) => (
        <motion.button
          variants={containerVariants}
          animate={activeItem === id ? 'visible' : 'hidden'}
          style={{ outline: 'none', width: '60%', margin: '10px auto' }}
          type="button"
          onClick={() => handleClick(id)}
          key={id}
        >
          <div>{title}</div>
          <motion.div
            variants={eventVariants}
            animate={activeItem === id ? 'visible' : 'hidden'}
          >
            {explantion}
          </motion.div>
          <motion.div
            variants={eventVariants}
            animate={activeItem === id ? 'visible' : 'hidden'}
          >
            {explantion}
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
}
