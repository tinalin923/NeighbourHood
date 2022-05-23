/* eslint-disable function-paren-newline */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useReducer, useState } from 'react';
import editReducer, { initialEditState } from './editReducer.js';
import { getFirestoreData } from '../../hooks/firebase/useFirestoreData.js';

const EditContext = createContext(initialEditState);
export const useEditState = () => useContext(EditContext);

// eslint-disable-next-line react/prop-types
export const EditContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(editReducer, initialEditState);
  // for controlled input component(not in reducer)
  const [introductionTextData, setIntroductionTextData] = useState([]);
  const [villageName, setVillageName] = useState('');

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

  // const setChiefName = (chiefName) => {
  //   dispatch({
  //     type: 'SET_CHIEF_NAME',
  //     payload: {
  //       chiefName,
  //     },
  //   });
  // };
  // const setChiefInfo = (chiefInfo) => {
  //   dispatch({
  //     type: 'SET_CHIEF_INFO',
  //     payload: {
  //       chiefInfo,
  //     },
  //   });
  // };
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
    array.forEach(({ id, title, details }) => {
      newAnnounceList = newAnnounceList.concat({ id, title, details });
    });
    dispatch({
      type: 'SET_ANNOUNCE_LIST',
      payload: {
        announceList: newAnnounceList,
      },
    });
  };

  const addAnnounceList = (id, title, picture, details) => {
    const newAnnounceList = state.announceList.concat({
      id,
      title,
      picture,
      details,
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

  const getUserDatasFromFirestore = async (currentUid) => {
    const currentUserDatas = await getFirestoreData(currentUid);
    setScrollList(currentUserDatas.scrollList);
    setIntroductionTextData(currentUserDatas.introductionTextData);
    setVillageName(currentUserDatas.village);
    // setChiefInfo(currentUserDatas.chiefInfo);
    setHeroImage(currentUserDatas.heroImage);
    setChiefAvator(currentUserDatas.chiefAvator);
    setAnnounceList(currentUserDatas.announceList);
    // dispatch({
    //   type: 'SET_USER_DATA',
    //   payload: {
    //     userDatas: currentUserDatas,
    //   },
    // });
  };

  const value = {
    published: state.published,
    isEditMode: state.isEditMode,
    heroImage: state.heroImage,
    chiefAvator: state.chiefAvator,
    introductionTextData,
    villageName,
    // chiefName: state.chiefName,
    // chiefInfo: state.chiefInfo,
    scrollList: state.scrollList,
    announceList: state.announceList,
    getUserDatasFromFirestore,
    toggleEditMode,
    setHeroImage,
    setChiefAvator,
    setIntroductionTextData,
    // setChiefName,
    // setChiefInfo,
    setScrollList,
    addScrollList,
    setAnnounceList,
    addAnnounceList,
    deleteAnnounceList,
  };

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
};
