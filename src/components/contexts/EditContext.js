/* eslint-disable function-paren-newline */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useReducer, useState } from 'react';
import editReducer, { initialEditState } from './editReducer.js';

const EditContext = createContext(initialEditState);
export const useEditState = () => useContext(EditContext);

// eslint-disable-next-line react/prop-types
export const EditContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editReducer, initialEditState);
  // for controlled input component(not in reducer)
  const [introductionTextData, setIntroductionTextData] = useState([]);
  const [imagePathList, setImagePathList] = useState([]);
  const [published, setPublished] = useState('');
  // for upload to firestorage
  const [imageList, setImageList] = useState([]);
  const [village, setVillage] = useState('');
  const [currentUserDatas, setCurrentUserDatas] = useState('');

  const toggleEditMode = () => {
    const editMode = !state.isEditMode;
    dispatch({
      type: 'TOGGLE_EDITMODE',
      payload: {
        isEditMode: editMode,
      },
    });
  };
  const setScrollList = (array) => {
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

  const addScrollList = (id, title) => {
    const newScrollList = state.scrollList.concat({ id, title });
    console.log(newScrollList);
    dispatch({
      type: 'ADD_SCROLL_LIST',
      payload: {
        scrollList: newScrollList,
      },
    });
  };
  const setAnnounceList = (array) => {
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
    console.log(newAnnounceList);
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
    console.log(newAnnouncePresentList);
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

  const getDatasToContext = (userDatasFromFirbase) => {
    setPublished(userDatasFromFirbase.published);
    setAnnounceList(userDatasFromFirbase.announceList);
    setScrollList(userDatasFromFirbase.scrollList);
    setCurrentUserDatas(userDatasFromFirbase);
    setIntroductionTextData(userDatasFromFirbase.introductionTextData);
    setImagePathList(userDatasFromFirbase.imagePathList);
    setVillage(userDatasFromFirbase.villageName);
  };

  const value = {
    published,
    isEditMode: state.isEditMode,
    currentUserDatas,
    introductionTextData,
    imagePathList,
    imageList,
    village,
    scrollList: state.scrollList,
    announceList: state.announceList,
    announcePresentList: state.announcePresentList,
    getDatasToContext,
    setPublished,
    toggleEditMode,
    setCurrentUserDatas,
    setVillage,
    setIntroductionTextData,
    setImagePathList,
    setImageList,
    setScrollList,
    addScrollList,
    setAnnounceList,
    addAnnounceList,
    deleteAnnounceList,
    setAnnouncePresentList,
    addAnnouncePresentList,
    deleteAnnouncePresentList,
  };

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
};
