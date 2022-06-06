/* eslint-disable no-await-in-loop */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStorageImages } from '../../firebase/useStorage.js';
import { ListTitle } from '../../styles/styledComponents/blockComponents.js';
import { useEditState } from '../contexts/EditContext.js';
import ActiveCard from './ActiveCard.js';

const Button = styled.button`
  width: 28px;
  height: 28px;
  background: none;
  opacity: 0.5;
  &: hover {
    opacity: 1;
  }
`;

const ImageContainer = styled(motion.div)`
  overflow: hidden;
  aspect-ratio: 560/500;
  @media (max-width: 600px) {
    aspect-ratio: 345/400;
  }
`;

export default function ActivityList() {
  const {
    editMode,
    imageList,
    activityList,
    activityPresentList,
    setActivityPresentList,
    deleteActivityList,
    deleteActivityPresentList,
  } = useEditState();
  const [selectedId, setSelectedId] = useState(null);
  console.log('activity1');
  console.log(activityPresentList);
  useEffect(() => {
    // 防止還未上傳到storage的圖片被讀取
    console.log('activity2');

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
    if (id === selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };
  // const eventVariants = {
  //   hidden: {
  //     height: '0px',
  //     opacity: 0,
  //     transition: {
  //       type: 'tween',
  //       duration: 0.1,
  //     },
  //   },
  //   visible: {
  //     height: 'auto',
  //     opacity: 1,
  //     transition: {
  //       type: 'tween',
  //       duration: 0.2,
  //       delay: 0.2,
  //     },
  //   },
  // };
  return (
    <>
      <ul
        style={{
          display: 'grid',
          gridColumnGap: '2rem',
          gridRowGap: '3rem',
          gridAutoRows: 'minmax(290px, auto)',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          width: '100%',
        }}
      >
        {activityPresentList.map(({ id, title, picture }) => (
          <li key={id}>
            <motion.div
              layoutId={`activity-${id}`}
              whileHover={{
                y: -10,
              }}
              style={{ cursor: 'pointer' }}
            >
              <ImageContainer
                layoutId={`image-${id}`}
                onClick={() => {
                  handleClick(id);
                }}
              >
                <img
                  alt={title}
                  src={picture}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 10%',
                  }}
                />
              </ImageContainer>

              <motion.div
                layoutId={`title-${id}`}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div>
                  <ListTitle>{title}</ListTitle>
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    deleteActivityPresentList(id);
                    deleteActivityList(id);
                  }}
                  style={{ display: editMode ? 'block' : 'none' }}
                >
                  <FontAwesomeIcon icon={solid('trash')} />
                </Button>
              </motion.div>
            </motion.div>
          </li>
        ))}
      </ul>
      <AnimatePresence initial={false}>
        {selectedId && (
          <ActiveCard
            activity={activityPresentList.filter(
              (activity) => activity.id === selectedId
            )}
            setActive={setSelectedId}
          />
        )}
      </AnimatePresence>
    </>
  );
}
