import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { useAuthState } from '../components/contexts/AuthContext.js';
import Header from '../components/Header/Header.js';

const Form = styled.form`
  width: 400px;
  margin: 120px auto;
  display: flex;
  flex-direction: column;
`;
const Block = styled.div`
  margin-top: 25px;
  width: 300px;
  border-radius: 25px;
  background-color: #ffffff26;
`;
const Input = styled.input`
  height: 53px;
  padding: 10px;
  border: none;
  outline: none;
  opcacity: transp arent;
`;
const icon = {
  position: 'relative',
  left: '5px',
  top: '8px',
  padding: '9px 8px',
  // transition: '0.3s',
  opacity: '0.5',
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const villageRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const { login } = useAuthState();

  async function handleSubmit() {
    setLoading(true);
    try {
      const userCredential = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(userCredential);
      navigate('/editing');
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  return (
    <>
      <Header />
      <Form>
        <Block>
          <FontAwesomeIcon icon={solid('house-chimney-user')} style={icon} />
          <Input ref={villageRef} placeholder="Village" required />
        </Block>
        <Block>
          <FontAwesomeIcon icon={solid('envelope')} style={icon} />
          <Input ref={emailRef} placeholder="Email" required />
        </Block>
        <Block>
          <FontAwesomeIcon icon={solid('lock')} style={icon} />
          <Input ref={passwordRef} placeholder="Password" required />
        </Block>
        <button type="submit" onClick={handleSubmit} disabled={loading}>
          GET STARTED
        </button>
      </Form>
    </>
  );
};

export default Login;
