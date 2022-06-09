import React, { useState } from 'react';
// import EditActivityBlock from '../../blocks/EditActivityBlock.js';
import AddButton from './AddButton.js';
import EditActivityModal from './EditActivityModal.js';

function AddActivityButton() {
  const [editShow, setEditShow] = useState(false);
  return (
    <>
      <AddButton
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
