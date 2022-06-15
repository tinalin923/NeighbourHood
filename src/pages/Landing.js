import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { useAuthState } from '../components/contexts/AuthContext.js';
import LandingHeader from '../components/Landing/LandingHeader.js';
import Section from '../components/Landing/Section.js';
import Footer from '../components/Footer/Footer.js';
import '../styles/scss/landing.scss';
import { StartButton } from '../styles/styledComponents/button.js';

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
            margin: '150px auto 90px',
            textAlign: 'center',
            letterSpacing: '-0.1rem',
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
        <div
          style={{
            width: '600px',
            maxWidth: '80vw',
            margin: '0 auto',
            display: 'flex',
          }}
        >
          <StartButton as={RouteLink} to={currentUid ? '/editing' : '/login'}>
            {currentUid ? '開始編輯' : '前往建立'}
          </StartButton>
          <StartButton as={RouteLink} to="/totalvillages">
            鄰里總覽
          </StartButton>
        </div>
      </div>
      <div>
        <Section
          step="1"
          name="Editing"
          title="編輯新增"
          details="可隨時新增刪減里內的公告和活動項目，並以動態方式即時呈現"
          url="https://streamable.com/kkwe5q"
          startColor="#009efd"
          endColor="#2af598"
        />
        <Section
          step="2"
          name="Preview"
          title="預覽畫面"
          details="即時預覽編輯更新後的畫面，不用重複等待上傳時間"
          url="https://streamable.com/fe1vp2"
          startColor="#56317a"
          endColor="#3d99be"
        />
        <Section
          step="3"
          name="Deploy"
          title="一鍵發佈"
          details="按下發佈後即有獨立網頁，輕鬆分享給里民"
          url="https://streamable.com/bg8qm5"
          startColor="#fc6262"
          endColor="#ffd86f"
        />
      </div>
      <div style={{ height: '150px' }} />
      <Footer />
    </>
  );
};

export default Landing;
