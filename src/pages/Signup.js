import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '../components/contexts/AuthContext.js';
import Header from '../components/Header/Header.js';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const { signup } = useAuthState();

  async function handleSubmit() {
    setLoading(true);
    try {
      const userCredential = await signup(
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
      <input ref={emailRef} placeholder="Email" required />
      <input ref={passwordRef} placeholder="Password" required />
      <button type="submit" onClick={handleSubmit} disabled={loading}>
        註冊
      </button>
    </>
  );
};

export default Signup;
