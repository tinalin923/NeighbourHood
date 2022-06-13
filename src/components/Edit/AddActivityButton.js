import React, { useState } from 'react';
import AddButton from './AddButton.js';
import EditActivityModal from './EditActivityModal.js';

function AddActivityButton() {
  const [editShow, setEditShow] = useState(false);
  return (
    <>
      <AddButton
        margin="0px"
        name="活動"
        setShow={() => {
          setEditShow(true);
        }}
      />
      {editShow && (
        <EditActivityModal
          setShow={() => {
            setEditShow(false);
          }}
        />
      )}
    </>
  );
}

export default AddActivityButton;
