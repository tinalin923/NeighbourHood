import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
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
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 1000px) {
    background-size: cover;
    background-position: top;
  }
  @media (max-width: 600px) {
    background-size: cover;
    background-position: top;
    margin-top: 4px;
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

const SingleImageInput = ({ name }) => {
  const [state, dispatch] = useReducer(imageReducer, initialState);
  const fileInput = useRef();
  const { currentVillageId } = useAuthState();
  const { published, editMode, setImageList, imagePathList, setImagePathList } =
    useEditState();

  useEffect(() => {
    if (!published) {
      return;
    }
    if (!imagePathList?.[name]) {
      return;
    }
    if (state.temporary) {
      return;
    }
    getStorageImages(imagePathList[name])
      .then((storedUrl) => {
        dispatch({
          type: 'SET_TEMPORARY',
          payload: { temporary: storedUrl },
        });
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVillageId, published]);
  const handleChange = async () => {
    const imageFile = fileInput.current.files[0];
    const imageFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (imageFile && imageFileTypes.includes(imageFile.type)) {
      dispatch({ type: 'SET_ERROR', payload: { error: null } });
    } else {
      dispatch({
        type: 'SET_ERROR',
        payload: { error: '?????????????????????(.jpeg ??? .png)' },
      });
      return;
    }
    // compressedImage ??????Blob??????
    const compressedImage = await compressImage(imageFile, 768);
    // ????????????firestorage??????blob???
    setImageList((prev) => [...prev, compressedImage]);
    setImagePathList((prev) => ({
      ...prev,
      [name]: `${currentVillageId}/${compressedImage?.name}`,
    }));
    // }

    // ???blob?????????blob url, ???????????????
    const compressedImageURL = URL.createObjectURL(compressedImage);
    //  compressedImageURL?????? blob+localhost?????????url
    dispatch({
      type: 'SET_TEMPORARY',
      payload: { temporary: compressedImageURL },
    });
    // URL.revokeObjectURL(compressedImageURL);  ?????????????????????
  };
  return (
    <Image
      style={{
        backgroundImage: state.temporary
          ? `url(${state.temporary})`
          : `linear-gradient(to right, ${secondaryGray}, ${thirdGray})`,
        opacity: editMode ? '0.7' : '1',
      }}
    >
      {state.error && (
        <ImageError style={{ display: editMode ? 'block' : 'none' }}>
          {state.error}
        </ImageError>
      )}
      <InputBtn style={{ display: editMode ? 'block' : 'none' }}>
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
        {state.temporary ? <P>??????????????????</P> : <P>????????????</P>}
      </InputBtn>
    </Image>
  );
};

SingleImageInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default SingleImageInput;
