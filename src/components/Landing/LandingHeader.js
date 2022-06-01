import React from 'react';
import { Link as RouteLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../assets/fonts/fonts.scss';
import { primaryGray } from '../../styles/styledComponents/color.js';
import { useAuthState } from '../contexts/AuthContext.js';

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #dddbd1;
  height: 80px;
`;
const Title = styled.p`
  margin-left: 10px;
  text-decoration: none;
  font-family: 'TESLA Regular';
  font-size: 1.2rem;
  color: ${primaryGray};
  opacity: 0.4;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;
const Button = styled.button`
  flex: auto;
  margin-right: 20px;
  padding: 5px;
  width: 180px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: ${primaryGray};
  text-decoration: none;
  color: white;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 5px #556588;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
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
  return (
    <>
      <Top>
        <Title as={RouteLink} to="/">
          NEIGHBoURHooD
        </Title>
        <div>
          <Button as={RouteLink} to="/total">
            鄉里總覽
          </Button>
          {currentUid ? (
            // eslint-disable-next-line react/jsx-no-bind
            <Button as={RouteLink} to="/" onClick={handleLogout}>
              登出
            </Button>
          ) : (
            <Button as={RouteLink} to="/login">
              登入
            </Button>
          )}
          <Button as={RouteLink} to="/signup">
            註冊
          </Button>
        </div>
      </Top>
      <Outlet />
    </>
  );
};

export default LandingHeader;
