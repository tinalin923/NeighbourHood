// import { motion } from 'framer-motion';
import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { useAuthState } from '../components/contexts/AuthContext.js';
import LandingHeader from '../components/Landing/LandingHeader.js';
import '../styles/scss/landing.scss';
import { Button } from '../styles/styledComponents/button.js';
import Section from '../components/Landing/Section.js';

const Landing = () => {
  const { currentUid } = useAuthState();
  return (
    <>
      <LandingHeader />
      <div style={{ width: '90%', margin: '10vh auto', textAlign: 'center' }}>
        <div
          style={{
            width: '90%',
            margin: '90px auto',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '4rem',
            letterSpacing: '-0.06rem',
          }}
        >
          <div className="pack">
            <p className="editing">Editing.</p>
            <p className="editing_base">Editing.</p>
          </div>
          <div className="pack">
            <p className="preview">Preview.</p>
            <p className="preview_base ">Preview.</p>
          </div>
          <div className="pack">
            <p className="deploy">Deploy.</p>
            <p className="deploy_base">Deploy.</p>
          </div>
        </div>
        <Button
          as={RouteLink}
          to={currentUid ? '/editing' : '/login'}
          style={{
            textDecoration: 'none',
            marginTop: '50px',
            padding: '20px',
          }}
        >
          {currentUid ? '開始編輯' : '前往建立'}
        </Button>
      </div>
      <div>
        <Section title="編輯頁面" details="使用所見及所得的方式" />
      </div>
    </>
  );
};

export default Landing;
