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

  useEffect(() => {
    setNowY(window.scrollY);
  }, [controlNavBar]);

  const { logout } = useAuthState();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  const items = [
    { title: '鄰里總覽', to: '/total', onClick: null },
    { title: '登出', to: '', onClick: () => handleLogout() },
  ];

  return (
    show && (
      <Top>
        <Breadcrumbs>
          <Favicon breadcrumb to="/" cursor="pointer" />
          <FontAwesomeIcon icon={solid('chevron-right')} />
          <li>
            <RouteLink to="/editing">編輯我的頁面</RouteLink>
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

export default EditingHeader;
