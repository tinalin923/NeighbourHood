import PropTypes from 'prop-types';
import React from 'react';
import { useEditState } from '../components/contexts/EditContext.js';
import SingleImageInput from '../components/Edit/SingleImageInput.js';
import TextInfo from '../components/Edit/TextInfo.js';
import {
  Block,
  TextArea,
  ImgArea,
  Main,
  Title,
} from '../styles/styledComponents/blockComponents.js';

function VillageIntroBlock({ name }) {
  const { introductionTextData, setIntroductionTextData } = useEditState();

  return (
    <Block name={name}>
      <Title>村里介紹</Title>
      <Main>
        <TextArea>
          <TextInfo
            name="villageInfo"
            placeholder="請輸入村里介紹"
            value={introductionTextData}
            setValue={setIntroductionTextData}
          />
        </TextArea>
        <ImgArea>
          <SingleImageInput name="villageImage" />
        </ImgArea>
      </Main>
    </Block>
  );
}
VillageIntroBlock.propTypes = {
  name: PropTypes.string.isRequired,
};
export default VillageIntroBlock;
