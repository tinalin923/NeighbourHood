import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { useAuthState } from '../components/contexts/AuthContext.js';
import LandingHeader from '../components/Landing/LandingHeader.js';
import Section from '../components/Landing/Section.js';
import '../styles/scss/landing.scss';
import { Button } from '../styles/styledComponents/button.js';

const Landing = () => {
  const { currentUid } = useAuthState();
  return (
    <>
      <LandingHeader />
      <div
        style={{ width: '90%', margin: '5vh auto 4px', textAlign: 'center' }}
      >
        <div
          style={{
            width: '90%',
            margin: '90px auto',
            textAlign: 'center',
            fontWeight: 'bold',
            letterSpacing: '-0.08rem',
          }}
        >
          <div className="pack">
            <p className="landing editing">Editing.</p>
            <p className="landing editing_base">Editing.</p>
          </div>
          <div className="pack">
            <p className="landing preview">Preview.</p>
            <p className="landing preview_base ">Preview.</p>
          </div>
          <div className="pack">
            <p className="landing deploy">Deploy.</p>
            <p className="landing deploy_base">Deploy.</p>
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
        <Section
          step="1"
          name="Editing"
          title="編輯頁面"
          details="使用所見及所得的方式使用所見及所得的方式使用所見及所得的方式使用所見及所得的方式使用所見及所得的方式使用所見及所得的方式使用所見及所得的方式使用所見及所得的方式"
          url="https://streamable.com/5gi30m"
          startColor="#009efd"
          endColor="#2af598"
        />
        <Section
          step="2"
          name="Preview"
          title="預覽畫面"
          details="使用所見及所得的方式"
          url="https://streamable.com/5gi30m"
          startColor="#56317a"
          endColor="#3d99be"
        />
        <Section
          step="3"
          name="Deploy"
          title="一鍵發佈"
          details="使用所見及所得的方式"
          url="https://streamable.com/5gi30m"
          startColor="#fc6262"
          endColor="#ffd86f"
        />
      </div>
      <div style={{ height: '150px' }} />
    </>
  );
};

export default Landing;
