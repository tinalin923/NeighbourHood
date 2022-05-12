import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { useAuthState } from '../components/contexts/AuthContext.js';
import Navigation from '../components/Header/Navigation.js';
import Background from '../assets/images/toa-heftiba-nrSzRUWqmoI-unsplash.jpg';

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

const Form = styled.form`
  width: 400px;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  color: red;
  font-weight: bold;
`;

const Button = styled.button`
  margin-top: 25px;
  width: 300px;
  border-radius: 25px;
  height: 53px;
  padding: 10px;
  border: none;
  outline: none;
  background: #fcd856;
  opacity: 0.9;
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const villageRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const { signup } = useAuthState();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(userCredential);
      navigate('/editing');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }
  return (
    <>
      <GlobalStyle />
      <Navigation />
      <Form>
        <Block>
          <FontAwesomeIcon icon={solid('house-chimney-user')} style={icon} />
          <Input ref={villageRef} placeholder="Village" required />
        </Block>
        <Block>
          <FontAwesomeIcon icon={solid('envelope')} style={icon} />
          <Input type="email" ref={emailRef} placeholder="Email" required />
        </Block>
        <Block>
          <FontAwesomeIcon icon={solid('lock')} style={icon} />
          <Input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            required
          />
        </Block>
        {error && <Err>{error}</Err>}
        <Button type="submit" onClick={handleSubmit} disabled={loading}>
          註冊
        </Button>
      </Form>
    </>
  );
};

export default Signup;
