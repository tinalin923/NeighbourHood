import React from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../assets/fonts/fonts.scss';
import { primaryGray } from '../../styles/styledComponents/color.js';
import { useAuthState } from '../contexts/AuthContext.js';

const Top = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #dddbd1;
  height: 80px;
  background: white;
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
  background-color: white;
  text-decoration: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: ${primaryGray};

    // box-shadow: 2px 2px 5px #556588;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const Header = () => {
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
    <Top>
      <Title as={RouteLink} to="/">
        NEIGHBoURHooD
      </Title>
      <ul>
        {currentUid ? (
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
      </ul>
    </Top>
  );
};

export default Header;
