/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable function-paren-newline */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components';
import { useAuthState } from '../contexts/AuthContext.js';
import { useEditState } from '../contexts/EditContext.js';
import TextInfoForEdit from './TextInfoForEdit.js';
import {
  Block,
  ImageError,
  Main,
  SecondaryBtn,
  TextError,
} from '../../styles/styledComponents/blockComponents.js';

// for imageBlock
import {
  secondaryGray,
  thirdGray,
} from '../../styles/styledComponents/color.js';
import compressImage from '../../utils/imageCompress.js';

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

const initialEditState = {
  temporaryUrl: '',
  imageError: '',
  id: '',
  title: '',
  details: '',
};

const editReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_TEMPORARY_URL':
      return { ...state, temporaryUrl: payload.temporaryUrl };
    case 'SET_IMAGE_ERROR':
      return { ...state, imageError: payload.imageError };

    case 'SET_ID':
      return { ...state, id: payload.id };
    case 'SET_TITLE':
      return { ...state, title: payload.title };
    case 'SET_DETAILS':
      return { ...state, details: payload.details };

    default:
      throw new Error();
  }
};

export default function EditArea({
  name,
  addList,
  addPresentList,
  error,
  setError,
  picture,
  setPicture,
}) {
  const [state, dispatch] = useReducer(editReducer, initialEditState);
  const setTemporaryUrl = (temporaryUrl) => {
    dispatch({
      type: 'SET_TEMPORARY_URL',
      payload: { temporaryUrl },
    });
  };
  const setImageError = (imageError) => {
    dispatch({
      type: 'SET_IMAGE_ERROR',
      payload: { imageError },
    });
  };
  const setId = (id) => {
    dispatch({
      type: 'SET_ID',
      payload: { id },
    });
  };
  const setTitle = (title) => {
    dispatch({
      type: 'SET_TITLE',
      payload: { title },
    });
  };
  const setDetails = (details) => {
    dispatch({
      type: 'SET_DETAILS',
      payload: { details },
    });
  };

  // for imageBlock
  const fileInput = useRef();
  const { currentVillageId } = useAuthState();
  const { isEditMode, setImageList } = useEditState();

  // 選擇照片
  const handleChange = async () => {
    const imageFile = fileInput.current.files[0];
    const imageFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (imageFile && imageFileTypes.includes(imageFile.type)) {
      setImageError(null);
      const compressedImage = await compressImage(imageFile, 1280);
      setPicture(compressedImage);
      const compressedImageURL = URL.createObjectURL(compressedImage);
      setTemporaryUrl(compressedImageURL);
    } else {
      setImageError('請選擇照片檔案(.jpeg 或 .png)');
    }
  };
  // 送出項目，產生新id
  const handleClick = () => {
    if (!state.title) {
      setError(`請輸入${name}標題`);
      return;
    }
    setImageError(null);
    setId((Math.floor(Math.random() * 10000) + 1).toString());
  };
  // for 上傳到總表
  useEffect(() => {
    if (!state.id) return;
    // 沒有選擇照片就不加入路徑
    if (!picture) {
      addList(state.id, state.title, state.details, '');
      console.log('沒圖片');
      addPresentList(state.id, state.title, state.details, '');
    } else {
      console.log('有圖片');
      setImageList((prev) => [...prev, picture]);
      addList(
        state.id,
        state.title,
        state.details,
        `${currentVillageId}/${picture.name}`
      );
      addPresentList(state.id, state.title, state.details, state.temporaryUrl);
    }
    // 輸入歸零
    setTitle('');
    setDetails('');
    setPicture('');
    setTemporaryUrl('');
  }, [state.id]);

  // for ui
  useEffect(() => {
    setError('');
  }, [state.title]);

  return (
    <Block>
      <Main>
        <div style={{ display: 'block', textAlign: 'center' }}>
          <TextInfoForEdit
            placeholder={`${name}標題`}
            value={state.title}
            setValue={setTitle}
            height="10vh"
          />
          <TextInfoForEdit
            placeholder={`詳細${name}說明`}
            value={state.details}
            setValue={setDetails}
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
                : `linear-gradient(90deg, ${secondaryGray}, ${thirdGray})`,
              opacity: isEditMode ? '0.7' : '1',
            }}
          >
            {state.imageError && (
              <ImageError style={{ display: isEditMode ? 'block' : 'none' }}>
                {state.imageError}
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
          {error && <TextError>{error}</TextError>}
          <SecondaryBtn
            // disabled={announceTitle === ''}
            type="button"
            onClick={() => handleClick()}
          >
            點擊新增{name}
          </SecondaryBtn>
        </div>
      </Main>
    </Block>
  );
}
