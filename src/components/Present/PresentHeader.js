import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propTypes from 'prop-types';
import React from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../assets/fonts/fonts.scss';
import { Breadcrumbs } from '../../styles/styledComponents/blockComponents.js';
import { primaryGray } from '../../styles/styledComponents/color.js';
import { useAuthState } from '../contexts/AuthContext.js';
import Favicon from '../Header/Favicon.js';
import NavTab from '../Header/NavUl.js';

const Top = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0 2px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px;
  height: 80px;
  z-index: 1;
  @media (max-width: 600px) {
    justify-content: space-between;
  }
`;

const Title = styled.p`
  flex: 0 0 30vw;
  text-decoration: none;
  text-align: center;
  font-family: 'TESLA Regular';
  font-size: 1.2rem;
  color: ${primaryGray};
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const PresentHeader = ({ breadcrumb }) => {
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
        { title: '前往編輯我的頁面', to: '/editing', onClick: '' },
        { title: '登出', to: '', onClick: () => handleLogout() },
      ]
    : [
        { title: '登入', to: '/login', onClick: '' },
        { title: '註冊', to: '/signup', onClick: '' },
        { title: '前往建立', to: '/', onClick: '' },
      ];
  return (
    <Top>
      <Breadcrumbs>
        <Favicon breadcrumb to="/" cursor="pointer" />
        <FontAwesomeIcon icon={solid('chevron-right')} />
        <li>
          <RouteLink to="/total">鄰里總覽</RouteLink>
        </li>
        <FontAwesomeIcon icon={solid('chevron-right')} />
        <li>
          <RouteLink to="/total">{breadcrumb}</RouteLink>
        </li>
      </Breadcrumbs>
      <Title as={RouteLink} to="/">
        NEIGHBoURHooD
      </Title>
      <NavTab items={items} flex="0 1 30vw" />
    </Top>
  );
};

PresentHeader.propTypes = {
  breadcrumb: propTypes.string.isRequired,
};

export default PresentHeader;
