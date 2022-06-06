import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import styled, { createGlobalStyle } from 'styled-components';
import Background from '../assets/images/compress-toa-heftiba-nrSzRUWqmoI-unsplash-min.jpg';
import { useAuthState } from '../components/contexts/AuthContext.js';
import LandingHeader from '../components/Landing/LandingHeader.js';
import { AuthButton } from '../styles/styledComponents/button.js';
import { primaryGray } from '../styles/styledComponents/color.js';
import cityOption from '../utils/city.js';

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

const Select = styled.select`
  height: 53px;
  width: 240px;
  padding: 10px;
  border: none;
  outline: none;
  background-color: transparent;
  color: #16181d;
`;

const Option = styled.option`
  background-color: transparent;
  color: #16181d;
  appearance: none;
  &:hover {
    background-color: transparent;
  }
`;

const Signup = () => {
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [city, setCity] = useState('基隆市');
  const navigate = useNavigate();

  const villageRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const { signup } = useAuthState();

  useEffect(() => {
    setSignupError('');
  }, [emailRef, passwordRef]);

  async function handleSubmit() {
    setSignupLoading(true);
    setSignupError('');
    try {
      const { uid, newVillageId } = await signup(
        emailRef.current.value,
        passwordRef.current.value,
        city,
        villageRef.current.value
      );
      console.log(`${uid}, ${newVillageId}`);
      navigate('/');
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/invalid-email') {
        setSignupError('請輸入正確信箱格式');
      } else if (error.code === 'auth/invalid-password') {
        setSignupError('請輸入至少六個字元的密碼');
      } else if (error.code === 'auth/email-already-exists') {
        setSignupError('此信箱已被註冊');
      } else if (error.code === 'auth/email-already-in-use') {
        setSignupError('此帳戶已被使用');
      } else {
        setSignupError(error.message);
      }
    }
    setSignupLoading(false);
  }
  return (
    <>
      <GlobalStyle />
      <LandingHeader />
      <Form>
        <Block>
          <FontAwesomeIcon icon={solid('city')} style={icon} />
          <Select
            required
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              console.log(e.target.value);
            }}
          >
            {cityOption.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Block>
        <Block>
          <FontAwesomeIcon icon={solid('house-chimney-user')} style={icon} />
          <Input ref={villageRef} placeholder="村里名" required />
        </Block>
        <Block>
          <FontAwesomeIcon icon={solid('envelope')} style={icon} />
          <Input type="email" ref={emailRef} placeholder="電子信箱" required />
        </Block>
        <Block>
          <FontAwesomeIcon icon={solid('lock')} style={icon} />
          <Input
            type="password"
            ref={passwordRef}
            placeholder="註冊密碼"
            required
          />
        </Block>
        {signupError && <Err>{signupError}</Err>}
        <AuthButton
          type="submit"
          onClick={handleSubmit}
          disabled={signupLoading}
        >
          {signupLoading ? (
            <BeatLoader
              size={15}
              color={`${primaryGray}`}
              loading={signupLoading}
              speedMultiplier={0.8}
            />
          ) : (
            '註冊'
          )}
        </AuthButton>
        <P as={RouteLink} to="/login">
          已經有帳戶？前往登入
        </P>
      </Form>
    </>
  );
};

export default Signup;
