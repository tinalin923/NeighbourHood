/* eslint-disable no-await-in-loop */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStorageImages } from '../../firebase/useStorage.js';
import { thirdGray } from '../../styles/styledComponents/color.js';
import { useEditState } from '../contexts/EditContext.js';
import ImagePresent from './ImagePresent.js';

const icon = {
  position: 'relative',
  right: '0',
  color: '#939393',
};

const Button = styled.button`
  width: 28px;
  height: 28px;
  background: none;
  opacity: 0.5;
  &: hover {
    opacity: 1;
  }
`;

export default function EventList() {
  const {
    isEditMode,
    imageList,
    announceList,
    announcePresentList,
    setAnnouncePresentList,
    deleteAnnounceList,
    deleteAnnouncePresentList,
  } = useEditState();
  const [activeAnnounceItem, setActiveAnnounceItem] = useState(0);

  const wholeButtonStyle = {
    flex: 'none',
    width: isEditMode ? '92%' : '99%',
    margin: '16px 0px',
    outline: 'none',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 20px',
    background: `${thirdGray}`,
    fontSize: '1.4rem',
    color: '#363b48',
  };

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
        duration: 0.1,
      },
    },
    visible: {
      height: 'auto',
      opacity: 1,
      y: '0',
      transition: {
        type: 'tween',
        duration: 0.2,
        delay: 0.2,
      },
    },
  };

  useEffect(() => {
    // 防止還未上傳到storage的圖片被讀取
    console.log(imageList.length);
    if (imageList.length !== 0) {
      console.log('不要讀取未上傳的圖片');
      return;
    }
    if (!announceList[0]?.id) {
      console.log('bye');
      return;
    }
    async function changeAnnounceListToPresent(List) {
      let array = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const announce of List) {
        if (!announce.picture) {
          array = array.concat({
            id: announce.id,
            title: announce.title,
            details: announce.details,
            picture: '',
          });
        } else {
          const storedUrl = await getStorageImages(announce.picture);
          console.log(storedUrl);
          array = array.concat({
            id: announce.id,
            title: announce.title,
            details: announce.details,
            picture: storedUrl,
          });
        }
      }
      console.log(array);
      console.log('1');
      setAnnouncePresentList(array);
    }
    console.log(announceList);
    changeAnnounceListToPresent(announceList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announceList]);

  // for 動畫
  const handleClick = (id) => {
    if (id === activeAnnounceItem) {
      setActiveAnnounceItem(null);
    } else {
      setActiveAnnounceItem(id);
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
            type="button"
            onClick={() => handleClick(id)}
            variants={containerVariants}
            animate={activeAnnounceItem === id ? 'visible' : 'hidden'}
            whileHover={{
              background: '#edf2fb',
              transition: { duration: 0.1 },
            }}
            style={wholeButtonStyle}
          >
            <div
              style={{
                marginTop: '12px',
                textAlign: 'left',
              }}
            >
              <h4>{title}</h4>
            </div>
            <motion.div
              variants={eventVariants}
              animate={activeAnnounceItem === id ? 'visible' : 'hidden'}
              style={{
                margin: '12px',
                textAlign: 'left',
                overflow: 'hidden',
              }}
            >
              <h6>{details}</h6>
              <br />
              {picture && <ImagePresent name="announceImage" src={picture} />}
            </motion.div>
          </motion.button>
          <Button
            type="button"
            onClick={() => {
              deleteAnnouncePresentList(id);
              deleteAnnounceList(id);
            }}
            style={{ display: isEditMode ? 'block' : 'none' }}
          >
            <FontAwesomeIcon icon={solid('trash')} style={icon} />
          </Button>
        </div>
      ))}
    </div>
  );
}
