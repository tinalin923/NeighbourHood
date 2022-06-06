import React from 'react';
import { Link as RouteLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../assets/fonts/fonts.scss';
import { primaryGray } from '../../styles/styledComponents/color.js';
import { useAuthState } from '../contexts/AuthContext.js';
import NavTab from '../Header/NavTab.js';
import Favicon from '../Header/Favicon.js';

const Top = styled.div`
  padding: 0 2px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #dddbd1;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px;
  height: 80px;
`;
const Title = styled.p`
  text-decoration: none;
  font-family: 'TESLA Regular';
  font-size: 1.2rem;
  color: ${primaryGray};
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const LandingHeader = () => {
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
        { title: '鄰里總覽', to: '/total', onClick: '' },
        { title: '登出', to: '', onClick: () => handleLogout() },
        { title: '編輯我的頁面', to: '/editing', onClick: '' },
      ]
    : [
        { title: '鄰里總覽', to: '/total', onClick: '' },
        { title: '登入', to: '/login', onClick: '' },
        {
          title: '註冊',
          to: '/signup',
          onClick: '',
        },
      ];

  return (
    <>
      <Top>
        <Title as={RouteLink} to="/">
          <Favicon />
          NEIGHBoURHooD
        </Title>
        <NavTab items={items} />
      </Top>
      <Outlet />
    </>
  );
};

export default LandingHeader;
