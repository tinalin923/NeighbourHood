import React from 'react';
import PropTypes from 'prop-types';
import { useEditState } from '../components/contexts/EditContext.js';
import SingleImageInput from '../components/Edit/SingleImageInput.js';
import TextInfo from '../components/Edit/TextInfo.js';
import InputInfo from '../components/Edit/InputInfo.js';
import {
  Block,
  ImgArea,
  Main,
  Title,
} from '../styles/styledComponents/blockComponents.js';

function ChiefIntroBlock({ name }) {
  const { introductionTextData, setIntroductionTextData } = useEditState();

  return (
    <Block name={name}>
      <Title>里長介紹</Title>
      <Main>
        <ImgArea>
          <SingleImageInput name="chiefAvator" />
          <InputInfo
            name="chiefName"
            placeholder="里長姓名"
            value={introductionTextData}
            setValue={setIntroductionTextData}
          />
        </ImgArea>
        <TextInfo
          name="chiefInfo"
          placeholder="請輸入介紹內容"
          value={introductionTextData}
          setValue={setIntroductionTextData}
        />
      </Main>
    </Block>
  );
}

ChiefIntroBlock.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ChiefIntroBlock;
