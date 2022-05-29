/* eslint-disable function-paren-newline */
/* eslint-disable no-await-in-loop */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStorageImages } from '../../firebase/useStorage.js';
import { useEditState } from '../contexts/EditContext.js';
import ActiveCard from './ActiveCard.js';
// import ImagePresent from './ImagePresent.js';

const Button = styled.button`
  width: 28px;
  height: 28px;
  background: none;
  opacity: 0.5;
  &: hover {
    opacity: 1;
  }
`;

const Image = styled.img`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 560/500;
  object-fit: cover;
  object-position: 50% 10%;
  @media (max-width: 600px) {
    aspect-ratio: 345/400;
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
        if (!activity.picture) {
          array = array.concat({
            id: activity.id,
            title: activity.title,
            details: activity.details,
            picture: '',
          });
        } else {
          const storedUrl = await getStorageImages(activity.picture);
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

  const handleClick = (id) => {
    console.log(id);
    if (id === activeActivityItem) {
      setActiveActivityItem(null);
    } else {
      setActiveActivityItem(id);
    }
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
  return (
    <>
      <ul
        style={{
          display: 'grid',
          gridGap: '1em',
          gridAutoRows: 'minmax(300px, auto)',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          width: '100%',
        }}
      >
        {activityPresentList.map((activity) => (
          <li key={activity.id}>
            <motion.div layoutId={activity.id}>
              <motion.div layoutId={activity.id}>
                <Image
                  alt={activity.title}
                  src={activity.picture}
                  onClick={() => {
                    handleClick(activity.id);
                  }}
                />
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <h4>{activity.title}</h4>
                  <Button
                    type="button"
                    onClick={() => {
                      deleteActivityPresentList(activity.id);
                      deleteActivityList(activity.id);
                    }}
                    style={{ display: isEditMode ? 'block' : 'none' }}
                  >
                    <FontAwesomeIcon icon={solid('trash')} />
                  </Button>
                </div>
              </motion.div>
              <motion.div
                variants={eventVariants}
                animate={
                  activeActivityItem === activity.id ? 'visible' : 'hidden'
                }
                style={{
                  margin: '12px',
                  textAlign: 'left',
                  overflow: 'hidden',
                }}
              >
                <h6>{activity.details}</h6>
              </motion.div>
            </motion.div>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {activeActivityItem && (
          <ActiveCard
            activity={activityPresentList.filter(
              (activity) => activity.id === activeActivityItem
            )}
            setActive={setActiveActivityItem}
          />
        )}
      </AnimatePresence>
    </>
  );
}
