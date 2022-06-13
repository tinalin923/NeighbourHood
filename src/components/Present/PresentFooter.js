import React from 'react';
import styled from 'styled-components';
import {
  secondaryGray,
  thirdGray,
} from '../../styles/styledComponents/color.js';
import { useEditState } from '../contexts/EditContext.js';

const FootBar = styled.footer`
  height: auto;
  padding: 8px 0;
  border-top: 2px solid ${thirdGray};
  background: ${secondaryGray};
  font-size: 1rem;
`;
const EditTime = styled.div`
  width: 60vw;
  margin: 16px auto;
  text-align: center;
  font-size: 1.2rem;
`;
const Tab = styled.a`
  display: block;
  width: 60vw;
  height: auto;
  margin: 24px auto;
  text-align: center;
  text-decoration: none;
  font-size: 1.2rem;
  &: hover {
    color: #0087bf;
  }
`;

function PresentFooter() {
  const { lastEditTime } = useEditState();
  console.log(lastEditTime.toString());
  return (
    <FootBar>
      <EditTime>最近更新時間：{lastEditTime}</EditTime>
      <Tab href="/">前往建立/編輯自己的鄰里頁面</Tab>
    </FootBar>
  );
}

export default PresentFooter;
