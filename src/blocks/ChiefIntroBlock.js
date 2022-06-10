import PropTypes from 'prop-types';
import React from 'react';
import { useEditState } from '../components/contexts/EditContext.js';
import InputInfo from '../components/Edit/InputInfo.js';
import SingleImageInput from '../components/Edit/SingleImageInput.js';
import TextInfo from '../components/Edit/TextInfo.js';
import {
  Block,
  TextArea,
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
        </ImgArea>
        <TextArea>
          <InputInfo
            name="chiefName"
            placeholder="里長姓名"
            value={introductionTextData}
            setValue={setIntroductionTextData}
          />
          <TextInfo
            name="chiefInfo"
            placeholder="請輸入介紹內容"
            value={introductionTextData}
            setValue={setIntroductionTextData}
            height="35vh"
          />
        </TextArea>
      </Main>
    </Block>
  );
}

ChiefIntroBlock.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ChiefIntroBlock;
