/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFirestoreVillageData } from '../../firebase/useFirestore.js';

const PresentContext = createContext();
export const usePresentState = () => useContext(PresentContext);

export const PresentContextProvider = ({ children, villageId }) => {
  const [editMode, setEditMode] = useState(true);
  const [published, setPublished] = useState('');
  const [announceList, setAnnounceList] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [scrollList, setScrollList] = useState([]);
  const [introductionTextData, setIntroductionTextData] = useState([]);
  const [imagePathList, setImagePathList] = useState([]);
  const [village, setVillage] = useState('');
  async function presentData(vId) {
    const villageData = await getFirestoreVillageData(vId);
    setPublished(villageData?.published);
    setAnnounceList(villageData?.announceList);
    setActivityList(villageData?.activityList);
    setScrollList(villageData?.scrollList);
    setIntroductionTextData(villageData?.introductionTextData);
    setImagePathList(villageData?.imagePathList);
    setVillage(villageData?.villageName);
  }
  useEffect(() => {
    setEditMode(false);
    presentData(villageId);
  }, []);

  const value = {
    editMode,
    published,
    announceList,
    activityList,
    scrollList,
    introductionTextData,
    imagePathList,
    village,
  };

  return (
    <PresentContext.Provider value={value}>{children}</PresentContext.Provider>
  );
};

PresentContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
  villageId: PropTypes.string.isRequired,
};
