import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouteLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../assets/fonts/fonts.scss';
import { primaryGray } from '../../styles/styledComponents/color.js';
import { slideDown } from '../../styles/styledComponents/keyframes.js';
import { useAuthState } from '../contexts/AuthContext.js';
import Favicon from '../Header/Favicon.js';
import NavUl from '../Header/NavUl.js';

const Top = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  z-index: 12;
  animation: ${slideDown} 0.2s;

  padding: 0 2px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #dddbd1;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px;
  height: 80px;
`;
const Title = styled.div`
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
  const [show, setShow] = useState(true);
  const [nowY, setNowY] = useState('');
  const controlNavBar = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (nowY > window.scrollY) {
        setShow(true);
      } else if (nowY < window.scrollY) {
        setShow(false);
      }
      setNowY(window.scrollY);
    },
    [nowY]
  );
  useEffect(() => {
    window.addEventListener('scroll', controlNavBar);
    return () => {
      window.removeEventListener('scroll', controlNavBar);
    };
  });

  useEffect(() => {
    setNowY(window.scrollY);
  }, [controlNavBar]);

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
        { title: '鄰里總覽', to: '/total', onClick: null },
        { title: '編輯我的頁面', to: '/editing', onClick: null },
        { title: '登出', to: '', onClick: () => handleLogout() },
      ]
    : [
        { title: '鄰里總覽', to: '/total', onClick: null },
        { title: '登入', to: '/login', onClick: null },
        {
          title: '註冊',
          to: '/signup',
          onClick: null,
        },
      ];

  return (
    <>
      {show && (
        <Top>
          <Title as={RouteLink} to="/">
            <Favicon />
            NEIGHBoURHooD
          </Title>
          <NavUl items={items} flex="0 1 25vw" right="13vw" />
        </Top>
      )}
      <Outlet />
    </>
  );
};

export default LandingHeader;
