import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Background from '../assets/images/toa-heftiba-nrSzRUWqmoI-unsplash.jpg';
import { useAuthState } from '../components/contexts/AuthContext.js';
// import { useEditState } from '../components/contexts/EditContext.js';
import Header from '../components/Header/Header.js';
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

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');
  const navigate = useNavigate();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const { login } = useAuthState();
  // const {
  //   setChiefName,
  //   setChiefInfo,
  //   setHeroImage,
  //   setChiefAvator,
  //   setScrollList,
  //   setAnnounceList,
  // } = useEditState();

  async function handleSubmit() {
    setLoginLoading(true);
    setErrorLogin('');
    try {
      const userCredential = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(userCredential);
      // const currentUid = userCredential.user.uid;
      // const storedUserDatas = await getFirestoreData(currentUid);
      // console.log(storedUserDatas.scrollList);
      // setScrollList(storedUserDatas.scrollList);

      // if (storedUserDatas.published) {
      //   setChiefName(storedUserDatas.chiefName);
      //   setChiefInfo(storedUserDatas.chiefInfo);
      //   setHeroImage(storedUserDatas.heroImage);
      //   setChiefAvator(storedUserDatas.chiefAvator);
      //   setAnnounceList(storedUserDatas.announceList);
      // }
      navigate('/editing');
    } catch (err) {
      setErrorLogin(err.message);
    }
    setLoginLoading(false);
  }
  return (
    <>
      <GlobalStyle />
      <Header />
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
