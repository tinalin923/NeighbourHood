import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { useAuthState } from '../components/contexts/AuthContext.js';
import LandingHeader from '../components/Landing/LandingHeader.js';
import {
  Block,
  Err,
  Form,
  GlobalStyle,
  icon,
  Input,
  P,
} from '../styles/styledComponents/authComponent.js';
import { AuthButton } from '../styles/styledComponents/button.js';
import { primaryGray } from '../styles/styledComponents/color.js';

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthState();

  useEffect(() => {
    setErrorLogin('');
  }, [emailLogin, passwordLogin]);

  async function handleSubmit() {
    if (!emailLogin || !passwordLogin) {
      setErrorLogin('請輸入完整資料');
      return;
    }
    setLoginLoading(true);
    setErrorLogin('');
    try {
      const userCredential = await login(emailLogin, passwordLogin);
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
        <div
          style={{
            margin: '1rem',
            fontSize: '1.5rem',
            borderBottom: '2px solid',
          }}
        >
          會員登入
        </div>

        <Block>
          <FontAwesomeIcon icon={solid('envelope')} style={icon} />
          <Input
            type="email"
            onChange={(e) => {
              setEmailLogin(e.target.value);
            }}
            placeholder="電子信箱"
            required
          />
        </Block>
        <Block>
          <FontAwesomeIcon icon={solid('lock')} style={icon} />
          <Input
            type="password"
            onChange={(e) => {
              setPasswordLogin(e.target.value);
            }}
            placeholder="帳戶密碼"
            required
          />
        </Block>

        {errorLogin && (
          <Err>
            <FontAwesomeIcon icon={solid('circle-exclamation')} beat />
            {errorLogin}
          </Err>
        )}
        <AuthButton
          type="submit"
          onClick={handleSubmit}
          disabled={loginLoading}
        >
          {loginLoading ? (
            <BeatLoader
              size={15}
              color={`${primaryGray}`}
              loading={loginLoading}
              speedMultiplier={0.8}
            />
          ) : (
            '登入'
          )}
        </AuthButton>
        <P as={RouteLink} to="/signup">
          還未有帳戶？前往註冊
        </P>
      </Form>
    </>
  );
};

export default Login;
