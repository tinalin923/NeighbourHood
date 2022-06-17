import React, { useState } from 'react';
import styled from 'styled-components';
import addIcon from '../../assets/images/post-add.png';
import EditActivityModal from './EditActivityModal.js';
import EditAnnounceModal from './EditAnnounceModal.js';
import {
  secondaryGray,
  primaryYellow,
  primaryGray,
} from '../../styles/styledComponents/color.js';

const Choose = styled.ul`
  position: fixed;
  bottom: 105px;
  right: 30px;
  width: 120px;
  height: auto;
  border-radius: 4px;
  background: ${secondaryGray};
  z-index: 3;
  cursor: pointer;
  box-shadow: inset 0 0 8px 1px rgba(0, 0, 0, 0.2);

  li {
    display: flex;
    align-items: center;
    padding: 8px;
    text-align: center;
    font-size: 1.2rem;
    color: ${primaryGray};
    div {
      margin-right: 4px;
    }
  }
  @media (min-width: 600px) {
    display: none;
  }
`;

const Icon = styled.div`
  position: fixed;
  bottom: 50px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  z-index: 2;
  cursor: pointer;
  background: ${primaryYellow};
  box-shadow: inset 0 0 8px 1px rgba(0, 0, 0, 0.2);
  @media (min-width: 600px) {
    display: none;
  }
`;

function AddEditionIcon() {
  const [blockDisplay, setBlockDisplay] = useState(false);
  const [editAnShow, setEditAnShow] = useState(false);
  const [editAcShow, setEditAcShow] = useState(false);

  const handleClick = () => {
    setBlockDisplay((prev) => !prev);
  };

  return (
    <>
      {blockDisplay && (
        <Choose>
          <li
            onClick={() => {
              setEditAnShow(true);
              setBlockDisplay(false);
            }}
            aria-hidden
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={primaryGray}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-minus"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            最新消息
          </li>
          <li
            onClick={() => {
              setEditAcShow(true);
              setBlockDisplay(false);
            }}
            aria-hidden
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={primaryGray}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-activity"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            活動訊息
          </li>
        </Choose>
      )}
      <Icon onClick={handleClick}>
        <img alt="" src={addIcon} />
      </Icon>
      {editAnShow && (
        <EditAnnounceModal
          setShow={() => {
            setEditAnShow(false);
          }}
        />
      )}

      {editAcShow && (
        <EditActivityModal
          setShow={() => {
            setEditAcShow(false);
          }}
        />
      )}
    </>
  );
}

export default AddEditionIcon;
