import React, { useState } from 'react';
import { useEditState } from '../components/contexts/EditContext.js';
import EditArea from '../components/Edit/EditArea.js';
import { Title } from '../styles/styledComponents/blockComponents.js';

export default function EditBullitinBlock1() {
  const { addAnnounceList, addAnnouncePresentList } = useEditState();
  const [announceError, setAnnounceError] = useState('');
  // 暫時圖片的blob檔
  const [announcePicture, setAnnouncePicture] = useState('');

  return (
    <>
      <Title>新增公告事項</Title>
      <EditArea
        name="公告"
        addList={addAnnounceList}
        addPresentList={addAnnouncePresentList}
        error={announceError}
        setError={setAnnounceError}
        picture={announcePicture}
        setPicture={setAnnouncePicture}
      />
    </>
  );
}
