/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import editReducer, { initialEditState } from './editReducer.js';

const EditContext = createContext(initialEditState);
export const useEditState = () => useContext(EditContext);

export const EditContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editReducer, initialEditState);
  // for controlled input component(not in reducer)
  const [editMode, setEditMode] = useState(true);
  const [introductionTextData, setIntroductionTextData] = useState([]);
  const [imagePathList, setImagePathList] = useState([]);
  const [published, setPublished] = useState('');
  const [village, setVillage] = useState('');
  const [currentUserDatas, setCurrentUserDatas] = useState('');
  const [lastEditTime, setLastEditTime] = useState('');
  // for upload to firestorage
  const [imageList, setImageList] = useState([]);

  const setScrollList = (array) => {
    if (!array) return;
    let newScrollList = [];
    array.forEach(({ id, title }) => {
      newScrollList = newScrollList.concat({ id, title });
    });
    dispatch({
      type: 'SET_SCROLL_LIST',
      payload: {
        scrollList: newScrollList,
      },
    });
  };

  const setAnnounceList = (array) => {
    if (!array) return;
    let newAnnounceList = [];
    array.forEach(({ id, title, details, picture }) => {
      newAnnounceList = newAnnounceList.concat({ id, title, details, picture });
    });
    dispatch({
      type: 'SET_ANNOUNCE_LIST',
      payload: {
        announceList: newAnnounceList,
      },
    });
  };

  const addAnnounceList = (id, title, details, picture) => {
    const newAnnounceList = state.announceList.concat({
      id,
      title,
      details,
      picture,
    });
    dispatch({
      type: 'ADD_ANNOUNCE_LIST',
      payload: {
        announceList: newAnnounceList,
      },
    });
  };

  const deleteAnnounceList = (id) => {
    const announceList = state.announceList.filter(
      (announce) => announce.id !== id
    );
    dispatch({
      type: 'DELETE_ANNOUNCE_LIST',
      payload: {
        announceList,
      },
    });
  };

  const setAnnouncePresentList = (array) => {
    let newAnnouncePresentList = [];
    array.forEach(({ id, title, details, picture }) => {
      newAnnouncePresentList = newAnnouncePresentList.concat({
        id,
        title,
        details,
        picture,
      });
    });
    dispatch({
      type: 'SET_ANNOUNCE_PRESENT_LIST',
      payload: {
        announcePresentList: newAnnouncePresentList,
      },
    });
  };

  const addAnnouncePresentList = (id, title, details, picture) => {
    const newAnnouncePresentList = state.announcePresentList.concat({
      id,
      title,
      details,
      picture,
    });
    dispatch({
      type: 'ADD_ANNOUNCE_PRESENT_LIST',
      payload: {
        announcePresentList: newAnnouncePresentList,
      },
    });
  };

  const deleteAnnouncePresentList = (id) => {
    const announcePresentList = state.announcePresentList.filter(
      (announce) => announce.id !== id
    );
    dispatch({
      type: 'DELETE_ANNOUNCE_PRESENT_LIST',
      payload: {
        announcePresentList,
      },
    });
  };
  const setActivityList = (array) => {
    if (!array) return;
    let newActivityList = [];
    array.forEach(({ id, title, details, picture }) => {
      newActivityList = newActivityList.concat({ id, title, details, picture });
    });
    dispatch({
      type: 'SET_ACTIVITY_LIST',
      payload: {
        activityList: newActivityList,
      },
    });
  };

  const addActivityList = (id, title, details, picture) => {
    const newActivityList = state.activityList.concat({
      id,
      title,
      details,
      picture,
    });
    dispatch({
      type: 'ADD_ACTIVITY_LIST',
      payload: {
        activityList: newActivityList,
      },
    });
  };

  const deleteActivityList = (id) => {
    const activityList = state.activityList.filter(
      (activity) => activity.id !== id
    );
    dispatch({
      type: 'DELETE_ACTIVITY_LIST',
      payload: {
        activityList,
      },
    });
  };

  const setActivityPresentList = (array) => {
    if (!array) return;
    let newActivityPresentList = [];
    array.forEach(({ id, title, details, picture }) => {
      newActivityPresentList = newActivityPresentList.concat({
        id,
        title,
        details,
        picture,
      });
    });
    dispatch({
      type: 'SET_ACTIVITY_PRESENT_LIST',
      payload: {
        activityPresentList: newActivityPresentList,
      },
    });
  };

  const addActivityPresentList = (id, title, details, picture) => {
    const newActivityPresentList = state.activityPresentList.concat({
      id,
      title,
      details,
      picture,
    });
    dispatch({
      type: 'ADD_ACTIVITY_PRESENT_LIST',
      payload: {
        activityPresentList: newActivityPresentList,
      },
    });
  };

  const deleteActivityPresentList = (id) => {
    const activityPresentList = state.activityPresentList.filter(
      (activity) => activity.id !== id
    );
    dispatch({
      type: 'DELETE_ACTIVITY_PRESENT_LIST',
      payload: {
        activityPresentList,
      },
    });
  };

  const getDatasToContext = (userDatasFromFirbase) => {
    setPublished(userDatasFromFirbase?.published);
    setAnnounceList(userDatasFromFirbase?.announceList);
    setActivityList(userDatasFromFirbase?.activityList);
    setScrollList(userDatasFromFirbase?.scrollList);
    setCurrentUserDatas(userDatasFromFirbase);
    setIntroductionTextData(userDatasFromFirbase?.introductionTextData);
    setImagePathList(userDatasFromFirbase?.imagePathList);
    setVillage(userDatasFromFirbase?.villageName);
    return false;
  };

  const value = useMemo(
    () => ({
      published,
      editMode,
      currentUserDatas,
      introductionTextData,
      imagePathList,
      imageList,
      village,
      scrollList: state.scrollList,
      announceList: state.announceList,
      announcePresentList: state.announcePresentList,
      activityList: state.activityList,
      activityPresentList: state.activityPresentList,
      lastEditTime,
      getDatasToContext,
      setPublished,
      setEditMode,
      setCurrentUserDatas,
      setVillage,
      setIntroductionTextData,
      setImagePathList,
      setImageList,
      setScrollList,
      setAnnounceList,
      addAnnounceList,
      deleteAnnounceList,
      setAnnouncePresentList,
      addAnnouncePresentList,
      deleteAnnouncePresentList,
      setActivityList,
      addActivityList,
      deleteActivityList,
      setActivityPresentList,
      addActivityPresentList,
      deleteActivityPresentList,
      setLastEditTime,
    }),
    [
      currentUserDatas,
      editMode,
      getDatasToContext,
      imageList,
      imagePathList,
      introductionTextData,
      published,
      state.activityList,
      state.activityPresentList,
      state.announceList,
      state.announcePresentList,
      state.scrollList,
      village,
    ]
  );

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
};

EditContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
