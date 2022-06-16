/* eslint-disable no-await-in-loop */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStorageImages } from '../../firebase/useStorage.js';
import {
  ListDetails,
  ListTitle,
} from '../../styles/styledComponents/blockComponents.js';
import { thirdGray } from '../../styles/styledComponents/color.js';
import { useEditState } from '../contexts/EditContext.js';
import AddAnnounceButton from './AddAnnounceButton.js';

const icon = {
  position: 'relative',
  right: '0',
  color: '#939393',
};

const DeleteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 0;
  width: 28px;
  height: 28px;
  background: none;
  opacity: 0.5;
  &: hover {
    opacity: 1;
  }
`;
const ImagePresent = styled.img`
  display: block;
  margin: 52px auto;
  max-width: 100%;
  border: 2px solid white;
`;
const AnnounceItem = styled(motion.div)`
  flex: 1 1 auto;
  position: relative;
  margin: 16px 0px;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  background: ${thirdGray};
  color: #363b48;
  cursor: pointer;
`;

export default function EventList() {
  const {
    editMode,
    imageList,
    announceList,
    announcePresentList,
    setAnnouncePresentList,
    deleteAnnounceList,
    deleteAnnouncePresentList,
  } = useEditState();
  const [activeAnnounceItem, setActiveAnnounceItem] = useState(null);

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
    if (imageList.length !== 0) {
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
          array = array.concat({
            id: announce.id,
            title: announce.title,
            details: announce.details,
            picture: storedUrl,
          });
        }
      }
      setAnnouncePresentList(array);
    }
    changeAnnounceListToPresent(announceList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announceList]);

  // for 動畫 + scroll bar
  const handleClick = (e, id) => {
    if (id === activeAnnounceItem) {
      setActiveAnnounceItem(null);
    } else {
      setActiveAnnounceItem(id);
      // prevent to scroll to other place
      if (activeAnnounceItem !== null) {
        window.scrollTo({
          top: window.pageYOffset - (e.pageY - window.pageYOffset),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {announcePresentList.map(({ id, title, details, picture }) => (
        <div
          key={id}
          style={{
            position: 'relative',
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <AnnounceItem
            onClick={(e) => {
              handleClick(e, id);
            }}
            variants={containerVariants}
            animate={activeAnnounceItem === id ? 'visible' : 'hidden'}
            whileHover={{
              background: '#e6e7ea',
              transition: { duration: 0.1 },
            }}
          >
            <div
              style={{
                margin: '12px 0px',
                textAlign: 'left',
              }}
            >
              <ListTitle>{title}</ListTitle>
            </div>
            <motion.div
              variants={eventVariants}
              animate={activeAnnounceItem === id ? 'visible' : 'hidden'}
              style={{
                textAlign: 'left',
                overflow: 'hidden',
              }}
            >
              <ListDetails>{details}</ListDetails>
              <br />
              {picture && <ImagePresent alt="announceImage" src={picture} />}
            </motion.div>
          </AnnounceItem>
          <DeleteButton
            type="button"
            onClick={() => {
              deleteAnnouncePresentList(id);
              deleteAnnounceList(id);
            }}
            style={{ display: editMode ? 'block' : 'none' }}
          >
            <FontAwesomeIcon icon={solid('trash')} style={icon} />
          </DeleteButton>
        </div>
      ))}
      {editMode && <AddAnnounceButton />}
    </div>
  );
}
