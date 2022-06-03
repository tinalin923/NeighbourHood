import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Background from '../assets/images/toa-heftiba-nrSzRUWqmoI-unsplash.jpg';
import { useAuthState } from '../components/contexts/AuthContext.js';
// import { useEditState } from '../components/contexts/EditContext.js';
import LandingHeader from '../components/Landing/LandingHeader.js';

import { Button } from '../styles/styledComponents/button.js';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0px;
    height: 100%;
    background-image: url(${Background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const Form = styled.div`
  width: 400px;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    width: 80%;
    margin: 10vh auto;
  }
`;
const Block = styled.div`
  margin-top: 20px;
  width: 300px;
  border-radius: 25px;
  background-color: #d4d6dd;
  opacity: 0.8;
`;
const Input = styled.input`
  height: 53px;
  padding: 10px;
  border: none;
  outline: none;
  background: transparent;
  color: #16181d;
`;
const icon = {
  position: 'relative',
  left: '5px',
  top: '8px',
  padding: '9px 8px',
  opacity: '0.8',
};
const Err = styled.div`
  margin-top: 12px;
  padding: 4px;
  background-color: red;
  opacity: 0.8;
  color: #f5f5f5;
`;
const P = styled.p`
  margin: 8px;
  text-decoration: none;
  border-radius: 4px;
  padding: 4px;
  font-weight: bold;
  color: #0078bf;
  font-size: 0.8rem;
  :hover {
    color: black;
  }
`;

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');
  const navigate = useNavigate();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const { login } = useAuthState();

  async function handleSubmit() {
    setLoginLoading(true);
    setErrorLogin('');
    try {
      const userCredential = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(userCredential);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setErrorLogin('請輸入正確信箱格式');
      } else if (error.code === 'auth/wrong-password') {
        setErrorLogin('輸入密碼錯誤');
      } else if (error.code === 'auth/user-not-found') {
        setErrorLogin('尚未註冊');
      } else {
        setErrorLogin(error.message);
      }
    }
    setLoginLoading(false);
  }
  return (
    <>
      <GlobalStyle />
      <LandingHeader />
      <Form>
        <Block>
          <FontAwesomeIcon icon={solid('envelope')} style={icon} />
          <Input type="email" ref={emailRef} placeholder="電子信箱" required />
        </Block>
        <Block>
          <FontAwesomeIcon icon={solid('lock')} style={icon} />
          <Input
            type="password"
            ref={passwordRef}
            placeholder="帳戶密碼"
            required
          />
        </Block>
        {errorLogin && <Err>{errorLogin}</Err>}
        <Button type="submit" onClick={handleSubmit} disabled={loginLoading}>
          登入
        </Button>
        <P as={RouteLink} to="/signup">
          還未有帳戶？前往註冊
        </P>
      </Form>
    </>
  );
};

export default Login;
