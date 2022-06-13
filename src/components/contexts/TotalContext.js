/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const TotalContext = createContext();
export const useTotalState = () => useContext(TotalContext);

export const TotalContextProvider = ({ children }) => {
  const [publishedVillages, setPublishedVillages] = useState();
  const [fetchError, setFetchError] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [publishedNumber, setPublishedNumber] = useState();
  const [snap, setSnap] = useState();

  const value = {
    publishedVillages,
    setPublishedVillages,
    fetchError,
    setFetchError,
    fetchLoading,
    setFetchLoading,
    publishedNumber,
    setPublishedNumber,
    snap,
    setSnap,
  };

  return (
    <TotalContext.Provider value={value}>{children}</TotalContext.Provider>
  );
};

TotalContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
