/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useReducer } from 'react';
import editReducer, { initialEditState } from './editReducer.js';

const EditContext = createContext(initialEditState);
export const useEditState = () => useContext(EditContext);

// eslint-disable-next-line react/prop-types
export const EditContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editReducer, initialEditState);
  const toggleEditMode = () => {
    const editMode = !state.isEditMode;

    dispatch({
      type: 'TOGGLE_EDITMODE',
      payload: {
        isEditMode: editMode,
      },
    });
  };

  const setHeroImage = (heroImageUrl) => {
    dispatch({
      type: 'SET_HEROIMAGE',
      payload: {
        heroImage: heroImageUrl,
      },
    });
  };

  const setChiefAvator = (avatorUrl) => {
    dispatch({
      type: 'SET_CHIEF_AVATOR',
      payload: {
        chiefAvator: avatorUrl,
      },
    });
  };

  const setChiefName = (chiefName) => {
    dispatch({
      type: 'SET_CHIEF_NAME',
      payload: {
        chiefName,
      },
    });
  };
  const setChiefInfo = (chiefInfo) => {
    dispatch({
      type: 'SET_CHIEF_INFO',
      payload: {
        chiefInfo,
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
  const addAnnounceList = (id, title, details) => {
    const newAnnounceList = state.announceList.concat({ id, title, details });
    console.log(newAnnounceList);
    dispatch({
      type: 'ADD_ANNOUNCE_LIST',
      payload: {
        announceList: newAnnounceList,
      },
    });
  };

  const value = {
    published: state.published,
    isEditMode: state.isEditMode,
    heroImage: state.heroImage,
    chiefAvator: state.chiefAvator,
    chiefName: state.chiefName,
    chiefInfo: state.chiefInfo,
    scrollList: state.scrollList,
    announceList: state.announceList,
    toggleEditMode,
    setHeroImage,
    setChiefAvator,
    setChiefName,
    setChiefInfo,
    setScrollList,
    addScrollList,
    addAnnounceList,
  };

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
};
