import React, { useState } from 'react';
import { useEditState } from '../components/contexts/EditContext.js';
import EditArea from '../components/Edit/EditArea.js';
import {
  EditBlock,
  Title,
} from '../styles/styledComponents/blockComponents.js';

export default function EditActivityBlock() {
  const { addActivityList, addActivityPresentList } = useEditState();
  const [activityError, setActivityError] = useState('');
  // 暫時圖片的blob檔
  const [activityPicture, setActivityPicture] = useState('');

  return (
    <EditBlock>
      <Title>新增活動事項</Title>
      <EditArea
        name="活動"
        addList={addActivityList}
        addPresentList={addActivityPresentList}
        error={activityError}
        setError={setActivityError}
        picture={activityPicture}
        setPicture={setActivityPicture}
      />
    </EditBlock>
  );
}
