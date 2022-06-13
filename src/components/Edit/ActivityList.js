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
import AddActivityButton from './AddActivityButton.js';

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
  position: relative;
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
  useEffect(() => {
    // 防止還未上傳到storage的圖片被讀取
    if (imageList.length !== 0) {
      console.log('不要讀取未上傳的圖片');
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
      console.log('1');
      setActivityPresentList(array);
    }
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
                <div
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    zIndex: '1',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-maximize"
                  >
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                </div>
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
        {editMode && <AddActivityButton />}
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
