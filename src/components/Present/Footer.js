import React from 'react';
import styled from 'styled-components';
import { thirdGray } from '../../styles/styledComponents/color.js';
import { useEditState } from '../contexts/EditContext.js';

const FootBar = styled.footer`
  height: 80px;
  padding: 16px 0;
  border-top: 2px solid ${thirdGray};
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.9rem;
  @media (max-width: 600px) {
    display: block;
    text-align: center;
  }
`;

const Tab = styled.a`
  display: block;
  margin: 12px auto;
  height: auto;
  text-decoration: none;
  &: hover {
    color: #0087bf;
  }
`;

function Footer() {
  const { lastEditTime } = useEditState();
  console.log(lastEditTime.toString());
  return (
    <FootBar>
      <Tab href="/">前往建立自己的鄰里頁面</Tab>
      <span style={{ width: '30vw' }}>最近更新時間：{lastEditTime}</span>
    </FootBar>
  );
}

export default Footer;
