import React, { useState } from 'react';
import AddButton from './AddButton.js';
import EditAnnounceModal from './EditAnnounceModal.js';

function AddActivityButton() {
  const [editShow, setEditShow] = useState(false);
  return (
    <>
      <AddButton
        name="公告"
        setShow={() => {
          setEditShow(true);
        }}
      />
      {editShow && (
        <EditAnnounceModal
          setShow={() => {
            setEditShow(false);
          }}
        />
      )}
    </>
  );
}

export default AddActivityButton;
