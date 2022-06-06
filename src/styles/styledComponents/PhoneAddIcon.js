import React from 'react';
import addIcon from '../../assets/images/post-add.png';
import { primaryYellow } from './color.js';

function PhoneAddIcon() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '50px',
        right: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
        width: '50px',
        height: '50px',
        background: `${primaryYellow}`,
      }}
    >
      <img alt="" src={addIcon} />
    </div>
  );
}

export default PhoneAddIcon;
