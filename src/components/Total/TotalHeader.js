import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import '../../assets/fonts/fonts.scss';
import { Breadcrumbs } from '../../styles/styledComponents/blockComponents.js';
import { useAuthState } from '../contexts/AuthContext.js';
import Favicon from '../Header/Favicon.js';
import NavUl from '../Header/NavUl.js';
import { Top, Title, Icon } from '../Header/HeaderDisplay.js';

const TotalHeader = () => {
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
        { title: '編輯我的頁面', to: '/editing', onClick: null },
        { title: '登出', to: '', onClick: () => handleLogout() },
      ]
    : [
        { title: '登入', to: '/login', onClick: null },
        { title: '註冊', to: '/signup', onClick: null },
        { title: '前往建立', to: '/', onClick: null },
      ];
  return (
    show && (
      <Top>
        <Breadcrumbs>
          <Favicon breadcrumb to="/" cursor="pointer" />
          <FontAwesomeIcon icon={solid('chevron-right')} />
          <li>
            <RouteLink to="/total">鄰里總覽</RouteLink>
          </li>
        </Breadcrumbs>
        <Title as={RouteLink} to="/">
          <Icon>
            <Favicon />
          </Icon>
          NEIGHBoURHooD
        </Title>
        <NavUl items={items} />
      </Top>
    )
  );
};

export default TotalHeader;
