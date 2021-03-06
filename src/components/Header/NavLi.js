import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/scss/header.scss';
import {
  backgroundGray,
  primaryGray,
  thirdGray,
} from '../../styles/styledComponents/color.js';
import { slideIn, slideDown } from '../../styles/styledComponents/keyframes.js';

const LiContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 0px;
  height: auto;
  background: ${backgroundGray};
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.3);
  z-index: 11;
  animation: ${slideIn} 0.5s;
  @media (min-width: 600px) {
    display: none;
  }
`;

const AuthLiContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 2vw;
  height: auto;
  background: ${backgroundGray};
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.3);
  z-index: 11;
  animation: ${slideDown} 0.5s;
  li {
    width: 120px;
    height: 48px;
  }
  @media (max-width: 600px) {
    right: 0px;
    animation: ${slideIn} 0.5s;
  }
`;

const Li = styled.li`
  flex: 1 1 8vw;
  position: relative;
  margin: 1px;
  height: 48px;
  border: none;
  text-decoration: none;
  color: ${primaryGray};
  cursor: pointer;
  @media (max-width: 600px) {
    width: 120px;
    height: 48px;
  }
`;

const HoverAnimation = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${thirdGray};
  border-radius: 16px;
  z-index: 1;
`;

function NavLi({ items, focused, setFocused, hambur, authed }) {
  const Lis = items.map((item) => (
    <Li
      key={item.title}
      onClick={item.onClick}
      onMouseEnter={() => setFocused(item.title)}
      hambur={hambur}
    >
      <NavLink className="tab" to={item.to}>
        {item.title}
      </NavLink>
      {focused === item.title ? (
        <HoverAnimation
          layoutId="highlight"
          transition={{
            layout: {
              duration: 0.2,
              ease: 'easeOut',
            },
          }}
        />
      ) : null}
    </Li>
  ));

  let NavLis;
  if (authed) {
    NavLis = (
      <AuthLiContainer onMouseLeave={() => setFocused(null)}>
        {Lis}
      </AuthLiContainer>
    );
  } else {
    NavLis = hambur ? (
      <LiContainer onMouseLeave={() => setFocused(null)}>{Lis}</LiContainer>
    ) : (
      Lis
    );
  }
  return NavLis;
}

NavLi.propTypes = {
  items: PropTypes.array.isRequired,
  hambur: PropTypes.bool.isRequired,
  focused: PropTypes.string,
  setFocused: PropTypes.func.isRequired,
};

NavLi.defaultProps = {
  focused: null,
};

export default NavLi;
