/* eslint-disable function-paren-newline */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useReducer, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthState } from '../components/contexts/AuthContext.js';
import { useEditState } from '../components/contexts/EditContext.js';
import TextInfoForEdit from '../components/Edit/TextInfoForEdit.js';
import {
  Block,
  ImageError,
  TextError,
  Main,
  SecondaryBtn,
  Title,
} from '../styles/styledComponents/blockComponents.js';
// for imageBlock
import {
  secondaryGray,
  secondaryYellow,
} from '../styles/styledComponents/color.js';
import compressImage from '../utils/imageCompress.js';

const Image = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 30vw;
  aspect-ratio: 3/4;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 600px) {
    width: 60vw;
  }
`;
const InputBtn = styled.label`
  margin: 30% auto;
  width: 36%;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  :hover > div {
    opacity: 0.9;
  }
  :hover > p {
    color: white;
  }
`;
const P = styled.p`
  text-align: center;
  color: #8d92a5;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px auto;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: white;
  opacity: 0.5;
`;
const icon = {
  opacity: '0.8',
};

const initialState = {
  temporaryUrl: '',
  error: '',
};

const imageReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_TEMPORARY_URL':
      return { ...state, temporaryUrl: payload.temporaryUrl };
    case 'SET_ERROR':
      return { ...state, error: payload.error };
    default:
      throw new Error();
  }
};

export default function EditBullitinBlock() {
  const { addAnnounceList, addAnnouncePresentList } = useEditState();
  const [announceTitle, setAnnounceTitle] = useState('');
  const [announceDetails, setAnnounceDetails] = useState('');
  const [announceError, setAnnounceError] = useState('');
  const id = (Math.floor(Math.random() * 10000) + 1).toString();
  // eslint-disable-next-line no-unused-vars
  // 為圖片BLOB檔
  const [announcePicture, setAnnouncePicture] = useState('');

  // for imageBlock
  const [state, dispatch] = useReducer(imageReducer, initialState);
  const fileInput = useRef();
  const { currentUid } = useAuthState();
  const { isEditMode, setImageList } = useEditState();

  // 選擇照片
  const handleChange = async () => {
    const imageFile = fileInput.current.files[0];
    const imageFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (imageFile && imageFileTypes.includes(imageFile.type)) {
      dispatch({ type: 'SET_ERROR', payload: { error: null } });
    } else {
      dispatch({
        type: 'SET_ERROR',
        payload: { error: '請選擇照片檔案(.jpeg 或 .png)' },
      });
    }
    const compressedImage = await compressImage(imageFile, 1280);
    setAnnouncePicture(compressedImage);
    const compressedImageURL = URL.createObjectURL(compressedImage);
    dispatch({
      type: 'SET_TEMPORARY_URL',
      payload: { temporaryUrl: compressedImageURL },
    });
  };
  // 送出公告，再加進整體列表
  const handleClick = () => {
    if (!announceTitle) {
      setAnnounceError('請輸入公告標題');
      return;
    }
    // 沒有選擇照片就不加入路徑
    if (!announcePicture) {
      addAnnounceList(id, announceTitle, announceDetails, '');
      console.log('2');
      addAnnouncePresentList(id, announceTitle, announceDetails, '');
    } else {
      setImageList((prev) => [...prev, announcePicture]);
      addAnnounceList(
        id,
        announceTitle,
        announceDetails,
        `${currentUid}/${announcePicture.name}`
      );
      addAnnouncePresentList(
        id,
        announceTitle,
        announceDetails,
        state.temporaryUrl
      );
    }
    // 輸入歸零
    setAnnounceTitle('');
    setAnnounceDetails('');
    setAnnouncePicture('');
    dispatch({
      type: 'SET_TEMPORARY_URL',
      payload: { temporaryUrl: '' },
    });
  };

  // for ui
  useEffect(() => {
    setAnnounceError('');
  }, [announceTitle]);

  return (
    <Block>
      <Title>新增公告事項</Title>
      <Main>
        <div style={{ display: 'block', textAlign: 'center' }}>
          <TextInfoForEdit
            placeholder="公告標題"
            value={announceTitle}
            setValue={setAnnounceTitle}
            height="10vh"
          />
          <TextInfoForEdit
            placeholder="詳細公告說明"
            value={announceDetails}
            setValue={setAnnounceDetails}
          />
        </div>
        <div
          style={{
            display: 'block',
            textAlign: 'center',
          }}
        >
          <Image
            style={{
              backgroundImage: state.temporaryUrl
                ? `url(${state.temporaryUrl})`
                : `linear-gradient(90deg, ${secondaryGray}, ${secondaryYellow})`,
              opacity: isEditMode ? '0.7' : '1',
            }}
          >
            {state.error && (
              <ImageError style={{ display: isEditMode ? 'block' : 'none' }}>
                {state.error}
              </ImageError>
            )}
            <InputBtn style={{ display: isEditMode ? 'block' : 'none' }}>
              <IconContainer>
                <FontAwesomeIcon icon={solid('plus')} style={icon} />
              </IconContainer>
              <input
                ref={fileInput}
                type="file"
                accept=".jpg, .png, .jpeg"
                // eslint-disable-next-line react/jsx-no-bind
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              {state.temporaryUrl ? <P>選擇其他圖片</P> : <P>新增圖片</P>}
            </InputBtn>
          </Image>
          {announceError && <TextError>{announceError}</TextError>}
          <SecondaryBtn
            // disabled={announceTitle === ''}
            type="button"
            onClick={() => handleClick()}
          >
            點擊新增公告
          </SecondaryBtn>
        </div>
      </Main>
    </Block>
  );
}
