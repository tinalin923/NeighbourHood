import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../assets/fonts/fonts.scss';
import styled from 'styled-components';

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dddbd1;
  height: 80px;
  // background-color: #363945;
  opacity: 0.4;
`;
const Title = styled.p`
  margin-left: 10px;
  text-decoration: none;
  font-family: 'TESLA Regular';
  font-size: 1.2rem;
  color: #363945;
`;
const Button = styled.button`
  margin: 0px 10px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: black;
  text-decoration: none;
  color: white;
  font-family: PingFang TC;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 5px #556588;
  }
`;

const Header = () => {
  // eslint-disable-next-line no-unused-vars
  const [Login, setLogin] = useState(true);
  return (
    <>
      <Top>
        <Title as={Link} to="/">
          NEIGHBoURHooD
        </Title>
        <div>
          <Button as={Link} to="/login">
            {Login ? '登出' : '登入'}
          </Button>
          <Button as={Link} to="/signup">
            註冊
          </Button>
        </div>
      </Top>
      <Outlet />
    </>
  );
};

export default Header;
