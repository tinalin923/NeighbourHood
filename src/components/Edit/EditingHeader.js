import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../assets/fonts/fonts.scss';
import { primaryGray } from '../../styles/styledComponents/color.js';
import { slideDown } from '../../styles/styledComponents/keyframes.js';
import { useAuthState } from '../contexts/AuthContext.js';
import Favicon from '../Header/Favicon.js';
import NavTab from '../Header/NavUl.js';

const Top = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  z-index: 11;
  animation: ${slideDown} 0.2s;

  padding: 0px 2px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #dddbd1;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px;
  height: 80px;
  @media (max-width: 600px) {
    padding: 0px 10px;
    justify-content: space-between;
  }
`;
const Title = styled.p`
  text-decoration: none;
  font-family: 'TESLA Regular';
  font-size: 1.2rem;
  color: ${primaryGray};
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const EditingHeader = () => {
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

  const { logout } = useAuthState();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  const items = [
    { title: '鄰里總覽', to: '/total', onClick: '' },
    { title: '登出', to: '', onClick: () => handleLogout() },
  ];

  return (
    show && (
      <Top>
        <Title as={RouteLink} to="/">
          <Favicon />
        </Title>
        <NavTab items={items} flex="0 1 20vw" right="16vw" />
      </Top>
    )
  );
};

export default EditingHeader;
