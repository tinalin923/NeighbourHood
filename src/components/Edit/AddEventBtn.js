/* eslint-disable react/prop-types */
import React from 'react';
import { useEditState } from '../contexts/EditContext.js';
import { SecondaryBtn } from '../../styles/styledComponents/blockComponents.js';

const AddEventBtn = ({ title, details }) => {
  const { announceList, addAnnounceList } = useEditState();

  const handleClick = () => {
    addAnnounceList(announceList.length, title, details);
  };

  return (
    <SecondaryBtn disabled={title === null} type="button" onClick={handleClick}>
      點擊新增公告
    </SecondaryBtn>
  );
};

export default AddEventBtn;
