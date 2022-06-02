import React from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../assets/fonts/fonts.scss';
import { primaryGray } from '../../styles/styledComponents/color.js';
import { useAuthState } from '../contexts/AuthContext.js';
import NavTab from '../Header/NavTab.js';

const Top = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px;
  height: 80px;
  z-index: 1;
`;
const Title = styled.p`
  flex: 30vw;
  text-decoration: none;
  text-align: center;
  font-family: 'TESLA Regular';
  font-size: 1.2rem;
  color: ${primaryGray};
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const TotalHeader = () => {
  const { currentUid, logout } = useAuthState();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  const items = currentUid
    ? [
        { title: '登出', to: '', onClick: () => handleLogout() },
        { title: '編輯鄰里頁面', to: '/editing', onClick: '' },
      ]
    : [
        { title: '登入', to: '/login', onClick: '' },
        { title: '里長註冊', to: '/signup', onClick: '' },
        { title: '前往建立', to: '/', onClick: '' },
      ];
  return (
    <Top>
      <div style={{ flex: '30vw' }} />
      <Title as={RouteLink} to="/">
        NEIGHBoURHooD
      </Title>
      <NavTab items={items} flex="30vw" />
    </Top>
  );
};

export default TotalHeader;
