// import { motion } from 'framer-motion';
import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { useAuthState } from '../components/contexts/AuthContext.js';
import LandingHeader from '../components/Landing/LandingHeader.js';
import '../styles/scss/landing.scss';
import { Button } from '../styles/styledComponents/button.js';

const Landing = () => {
  const { currentUid } = useAuthState();
  return (
    <>
      <LandingHeader />
      <div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ delay: 0.1 }}
        style={{ width: '90%', margin: '90px auto', textAlign: 'center' }}
      >
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
    </>
  );
};

export default Landing;
