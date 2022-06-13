/* eslint-disable react-hooks/exhaustive-deps */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components';
import {
  ImageError,
  SecondaryBtn,
  TextError,
} from '../../styles/styledComponents/blockComponents.js';
// for imageBlock
import {
  secondaryGray,
  thirdGray,
} from '../../styles/styledComponents/color.js';
import compressImage from '../../utils/imageCompress.js';
import { useAuthState } from '../contexts/AuthContext.js';
import { useEditState } from '../contexts/EditContext.js';
import TextInfoForEdit from './TextInfoForEdit.js';

const Edit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const Text = styled.div`
  display: block;
  width: 80%;
  height: 100%;
  text-align: center;
`;

const Image = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20%;
  width: 70%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const InputBtn = styled.label`
  margin: 0.5rem auto;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover > div {
    opacity: 0.9;
  }
  &:hover > p {
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

function EditArea({
  name,
  addList,
  addPresentList,
  error,
  setError,
  picture,
  setPicture,
  setShow,
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
  const { setImageList } = useEditState();

  // 選擇照片
  const handleChange = async () => {
    const imageFile = fileInput.current.files[0];
    const imageFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (imageFile && imageFileTypes.includes(imageFile.type)) {
      setImageError(null);
      const compressedImage = await compressImage(imageFile, 768);
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
      addPresentList(state.id, state.title, state.details, '');
    } else {
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
    setShow();
  }, [state.id]);

  // for ui
  useEffect(() => {
    setError('');
  }, [state.title]);

  return (
    <>
      <Edit>
        <Text>
          <TextInfoForEdit
            placeholder={`${name}標題`}
            value={state.title}
            setValue={setTitle}
            height="8vh"
          />
          <TextInfoForEdit
            placeholder={`詳細${name}說明`}
            value={state.details}
            setValue={setDetails}
            height="16vh"
          />
        </Text>

        <Image
          style={{
            backgroundImage: state.temporaryUrl
              ? `url(${state.temporaryUrl})`
              : `linear-gradient(90deg, ${secondaryGray}, ${thirdGray})`,
          }}
        >
          {state.imageError && <ImageError>{state.imageError}</ImageError>}
          <InputBtn>
            <IconContainer>
              <FontAwesomeIcon icon={solid('plus')} style={icon} />
            </IconContainer>
            <input
              ref={fileInput}
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={() => handleChange()}
              style={{ display: 'none' }}
            />
            {state.temporaryUrl ? <P>選擇其他圖片</P> : <P>新增圖片</P>}
          </InputBtn>
        </Image>
      </Edit>

      <div style={{ margin: '8px', textAlign: 'center' }}>
        {error && <TextError>{error}</TextError>}
        <SecondaryBtn type="button" onClick={() => handleClick()}>
          點擊新增{name}
        </SecondaryBtn>
      </div>
    </>
  );
}

EditArea.propTypes = {
  name: PropTypes.string.isRequired,
  addList: PropTypes.func.isRequired,
  addPresentList: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  picture: PropTypes.any,
  setPicture: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
};

EditArea.defaultProps = {
  picture: '',
};
export default EditArea;
