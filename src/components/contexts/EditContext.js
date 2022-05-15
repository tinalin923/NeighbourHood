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

  const setHeroImage = (imageUrl) => {
    dispatch({
      type: 'SET_HEROIMAGE',
      payload: {
        heroImage: imageUrl,
      },
    });
  };
  const value = {
    isEditMode: state.isEditMode,
    heroImage: state.heroImage,
    toggleEditMode,
    setHeroImage,
  };

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
};
