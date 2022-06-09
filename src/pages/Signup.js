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
  Option,
  P,
  Select,
} from '../styles/styledComponents/authComponent.js';
import { AuthButton } from '../styles/styledComponents/button.js';
import { primaryGray } from '../styles/styledComponents/color.js';
import cityOption from '../utils/city.js';

const Signup = () => {
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [city, setCity] = useState('基隆市');
  const [village, setVillage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuthState();

  useEffect(() => {
    setSignupError('');
  }, [village, email, password]);

  async function handleSubmit() {
    if (!village || !email || !password) {
      setSignupError('請輸入完整資料');
      return;
    }
    setSignupLoading(true);
    setSignupError('');
    try {
      const { uid, newVillageId } = await signup(
        email,
        password,
        city,
        village
      );
      console.log(`${uid}, ${newVillageId}`);
      navigate('/');
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/invalid-email') {
        setSignupError('請輸入正確信箱格式');
      } else if (error.code === 'auth/weak-password') {
        setSignupError('請輸入至少六個字元的密碼');
      } else if (error.code === 'auth/email-already-exists') {
        setSignupError('此信箱已被註冊');
      } else if (error.code === 'auth/email-already-in-use') {
        setSignupError('此信箱已被註冊');
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
        <div
          style={{
            margin: '1rem',
            fontSize: '1.5rem',
            borderBottom: '2px solid',
          }}
        >
          註冊會員
        </div>

        <Block>
          <FontAwesomeIcon icon={solid('city')} style={icon} />
          <Select
            required
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
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
          <Input
            onChange={(e) => {
              setVillage(e.target.value);
            }}
            placeholder="村里名"
            required
          />
        </Block>
        <Block>
          <FontAwesomeIcon icon={solid('envelope')} style={icon} />
          <Input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
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
              setPassword(e.target.value);
            }}
            placeholder="註冊密碼"
            required
          />
        </Block>

        {signupError && (
          <Err>
            <FontAwesomeIcon icon={solid('circle-exclamation')} beat />
            {signupError}
          </Err>
        )}
        <AuthButton
          type="submit"
          onClick={handleSubmit}
          disabled={signupLoading}
        >
          {signupLoading ? (
            <div
              style={{
                width: '150px',
                margin: 'auto',
              }}
            >
              <BeatLoader
                size={15}
                color={`${primaryGray}`}
                loading={signupLoading}
                speedMultiplier={0.8}
              />
            </div>
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
