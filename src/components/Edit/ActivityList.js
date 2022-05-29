/* eslint-disable no-await-in-loop */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useEditState } from '../contexts/EditContext.js';
import ActiveCard from './ActiveCard.js';
import ImagePresent from './ImagePresent.js';
import { getStorageImages } from '../../firebase/useStorage.js';

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

export default function ActivityList() {
  const {
    isEditMode,
    imageList,
    activityList,
    activityPresentList,
    setActivityPresentList,
    deleteActivityList,
    deleteActivityPresentList,
  } = useEditState();
  const [activeActivityItem, setActiveActivityItem] = useState(null);

  useEffect(() => {
    // 防止還未上傳到storage的圖片被讀取
    console.log(imageList.length);
    if (imageList.length !== 0) {
      console.log('不要讀取未上傳的圖片');
      return;
    }
    if (!activityList[0]?.id) {
      console.log('bye');
      return;
    }
    async function changeActivityListToPresent(List) {
      let array = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const activity of List) {
        const storedUrl = await getStorageImages(activity.picture);
        if (!storedUrl) {
          array = array.concat({
            id: activity.id,
            title: activity.title,
            details: activity.details,
            picture: '',
          });
        } else {
          array = array.concat({
            id: activity.id,
            title: activity.title,
            details: activity.details,
            picture: storedUrl,
          });
        }
      }
      console.log(array);
      console.log('1');
      setActivityPresentList(array);
    }
    console.log(activityList);
    changeActivityListToPresent(activityList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityList]);

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
  return (
    <>
      {activityPresentList.map(({ id, title, picture, details }) => (
        <div
          key={id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <motion.div
            layoutId={id}
            onClick={() => {
              setActiveActivityItem(id);
            }}
          >
            <ImagePresent name="activityImage" src={picture} />
            <h4>{title}</h4>
            <motion.div
              variants={eventVariants}
              animate={activeActivityItem === id ? 'visible' : 'hidden'}
              style={{
                margin: '12px',
                textAlign: 'left',
                overflow: 'hidden',
              }}
            >
              <h6>{details}</h6>
            </motion.div>
            <Button
              type="button"
              onClick={() => {
                deleteActivityPresentList(id);
                deleteActivityList(id);
              }}
              style={{ display: isEditMode ? 'block' : 'none' }}
            >
              <FontAwesomeIcon icon={solid('trash')} style={icon} />
            </Button>
          </motion.div>
        </div>
      ))}
      <AnimatePresence>
        {activeActivityItem && (
          <ActiveCard activity={activityPresentList[activeActivityItem]} />
        )}
      </AnimatePresence>
    </>
  );
}
