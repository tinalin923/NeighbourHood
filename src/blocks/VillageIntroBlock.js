import React from 'react';
import PropTypes from 'prop-types';
import TextInfo from '../components/Edit/TextInfo.js';
import {
  Block,
  Title,
  Main,
  ImgArea,
} from '../styles/styledComponents/blockComponents.js';
import { useEditState } from '../components/contexts/EditContext.js';
import SingleImageInput from '../components/Edit/SingleImageInput.js';

function VillageIntroBlock({ name }) {
  const { introductionTextData, setIntroductionTextData } = useEditState();

  return (
    <Block name={name}>
      <Title>村里介紹</Title>
      <Main>
        <TextInfo
          name="villageInfo"
          placeholder="請輸入村里介紹"
          value={introductionTextData}
          setValue={setIntroductionTextData}
        />
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
