/* eslint-disable react-hooks/exhaustive-deps */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components';
import { getStorageImages } from '../../firebase/useStorage.js';
import { ImageError } from '../../styles/styledComponents/blockComponents.js';
import {
  secondaryGray,
  thirdGray,
} from '../../styles/styledComponents/color.js';
import compressImage from '../../utils/imageCompress.js';
import { useAuthState } from '../contexts/AuthContext.js';
import { useEditState } from '../contexts/EditContext.js';

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
  temporary: '',
  error: '',
};

const imageReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_TEMPORARY':
      return { ...state, temporary: payload.temporary };
    case 'SET_ERROR':
      return { ...state, error: payload.error };
    default:
      throw new Error();
  }
};

// eslint-disable-next-line react/prop-types
const SingleImageBlock = ({ name }) => {
  const [state, dispatch] = useReducer(imageReducer, initialState);
  const fileInput = useRef();
  const { currentUid } = useAuthState();
  const {
    published,
    isEditMode,
    setImageList,
    imagePathList,
    setImagePathList,
  } = useEditState();

  useEffect(() => {
    if (!published) {
      return;
    }
    if (!imagePathList?.[name]) {
      console.log('bye');
      return;
    }
    if (state.temporary) {
      return;
    }
    getStorageImages(imagePathList[name])
      .then((storedUrl) => {
        console.log('get');
        dispatch({
          type: 'SET_TEMPORARY',
          payload: { temporary: storedUrl },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentUid, published]);

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
    // compressedImage 為一Blob物件
    const compressedImage = await compressImage(imageFile, 1024);
    // 要上傳到firestorage需要blob檔
    setImageList((prev) => [...prev, compressedImage]);
    setImagePathList((prev) => ({
      ...prev,
      [name]: `${currentUid}/${compressedImage?.name}`,
    }));
    // }

    // 將blob檔轉為blob url, 做即時呈現
    const compressedImageURL = URL.createObjectURL(compressedImage);
    //  compressedImageURL為一 blob+localhost開頭的url
    dispatch({
      type: 'SET_TEMPORARY',
      payload: { temporary: compressedImageURL },
    });
    // URL.revokeObjectURL(compressedImageURL);  加了會讓我無法呈現出來
  };
  return (
    <Image
      style={{
        backgroundImage: state.temporary
          ? `url(${state.temporary})`
          : `linear-gradient(90deg, ${secondaryGray}, ${thirdGray})`,
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
        {state.temporary ? <P>選擇其他圖片</P> : <P>新增圖片</P>}
      </InputBtn>
    </Image>
  );
};

export default SingleImageBlock;
