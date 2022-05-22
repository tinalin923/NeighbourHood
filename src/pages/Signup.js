import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Background from '../assets/images/toa-heftiba-nrSzRUWqmoI-unsplash.jpg';
import { useAuthState } from '../components/contexts/AuthContext.js';
import Header from '../components/Header/Header.js';
import { Button } from '../styles/styledComponents/button.js';
import { getFirestoreData } from '../hooks/firebase/useFirestoreData.js';
import { useEditState } from '../components/contexts/EditContext.js';

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

const P = styled.p`
  margin-top: 10px;
  text-decoration: none;
  color: white;
  font-size: 0.8rem;
  :hover {
    color: black;
  }
`;

const Signup = () => {
  const [signupLoading, setSignupLoading] = useState(false);
  const [signError, setSignError] = useState('');
  const navigate = useNavigate();
  const villageRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const { signup } = useAuthState();
  const { setScrollList } = useEditState();
  async function handleSubmit() {
    setSignupLoading(true);
    setSignError('');
    try {
      const userId = await signup(
        emailRef.current.value,
        passwordRef.current.value,
        villageRef.current.value
      );
      console.log(userId);
      // const currentUid = userCredential.user.uid;
      const storedUserDatas = await getFirestoreData(userId);
      console.log(storedUserDatas.scrollList);
      setScrollList(storedUserDatas.scrollList);
      navigate('/editing');
    } catch (err) {
      console.log(err);
      setSignError(err.message);
    }
    setSignupLoading(false);
  }
  return (
    <>
      <GlobalStyle />
      <Header />
      <Form>
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
        {signError && <Err>{signError}</Err>}
        <Button type="submit" onClick={handleSubmit} disabled={signupLoading}>
          註冊
        </Button>
        <P as={RouteLink} to="/login">
          已經有帳戶？前往登入
        </P>
      </Form>
    </>
  );
};

export default Signup;
