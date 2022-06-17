import { Dialog } from '@headlessui/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { EditPresentBlock } from '../../styles/styledComponents/blockComponents.js';

import {
  backgroundGray,
  primaryGray,
} from '../../styles/styledComponents/color.js';
import { useEditState } from '../contexts/EditContext.js';
import EditArea from './EditArea.js';

function EditActivityModal({ setShow }) {
  const { addActivityList, addActivityPresentList } = useEditState();
  const [activityError, setActivityError] = useState('');
  // 暫時圖片的blob檔
  const [activityPicture, setActivityPicture] = useState('');

  return (
    <Dialog
      open
      onClose={setShow}
      style={{ position: 'absolute', zIndex: '30' }}
    >
      <div
        style={{
          position: 'fixed',
          top: '0px',
          right: '0px',
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
        }}
        arial-hidden="true"
      />
      <EditPresentBlock>
        <Dialog.Panel
          style={{
            width: '100%',
            height: '100%',
            background: `${primaryGray}`,
            borderRadius: '8px',
          }}
        >
          <Dialog.Title
            style={{
              textAlign: 'center',
              fontSize: '1.3rem',
              lineHeight: '3rem',
              padding: '0.5rem',
              borderBottom: `1px solid ${backgroundGray}`,
              color: `${backgroundGray}`,
            }}
          >
            新增活動事項
          </Dialog.Title>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`${backgroundGray}`}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-square"
            onClick={setShow}
            style={{
              position: 'absolute',
              top: '0.9rem',
              right: '4px',
              cursor: 'pointer',
            }}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="15" />
            <line x1="15" y1="9" x2="9" y2="15" />
          </svg>
          <div style={{ display: 'block', marginTop: '1rem' }}>
            <EditArea
              name="活動"
              addList={addActivityList}
              addPresentList={addActivityPresentList}
              error={activityError}
              setError={setActivityError}
              picture={activityPicture}
              setPicture={setActivityPicture}
              setShow={setShow}
            />
          </div>
        </Dialog.Panel>
      </EditPresentBlock>
    </Dialog>
  );
}

EditActivityModal.propTypes = {
  setShow: PropTypes.func.isRequired,
};

export default EditActivityModal;
