import { motion } from 'framer-motion';
import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { useAuthState } from '../components/contexts/AuthContext.js';
import LandingHeader from '../components/Landing/LandingHeader.js';
import { Button } from '../styles/styledComponents/button.js';
import {
  primaryGray,
  primaryYellow,
} from '../styles/styledComponents/color.js';

const Landing = () => {
  const { currentUid } = useAuthState();
  return (
    <>
      <LandingHeader />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ width: '90%', margin: '90px auto', textAlign: 'center' }}
      >
        <motion.div
          initial={{ color: `${primaryGray}`, x: '-100vw' }}
          animate={{
            fontSize: 40,
            color: `${primaryYellow}`,
            scale: 1.2,
            x: 0,
          }}
          style={{
            width: '90%',
            margin: '90px auto',
            textAlign: 'center',
            fontSize: '2rem',
          }}
        >
          Welcome to NeighbourHood!
        </motion.div>
        <br />
        <br />
        <br />
        <Button
          as={RouteLink}
          to={currentUid ? '/editing' : '/login'}
          style={{
            textDecoration: 'none',
            marginTop: '150px',
            padding: '20px',
          }}
        >
          {currentUid ? '開始編輯頁面' : '前往建立'}
        </Button>
      </motion.div>
    </>
  );
};

export default Landing;
