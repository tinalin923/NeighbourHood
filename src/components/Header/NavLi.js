/* eslint-disable react/forbid-prop-types */
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import '../../styles/scss/header.scss';
import {
  backgroundGray,
  primaryGray,
  thirdGray,
} from '../../styles/styledComponents/color.js';

const slideIn = keyframes`
  from{
    transform: translateX(100%);
  }
  to{
    transform: translateX(0px);
  }
`;

const LiContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 0px;
  height: auto;
  flex: 0 0 100%;
  flex-wrap: wrap;
  background: ${backgroundGray};
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.3);
  z-index: 11;
  animation: ${slideIn} 0.5s;

  @media (min-width: 600px) {
    display: none;
  }
`;

const Li = styled.li`
  position: relative;
  margin: 8px;
  width: 8vw;
  height: 48px;
  border: none;
  text-decoration: none;
  color: ${primaryGray};
  cursor: pointer;
  @media (max-width: 600px) {
    width: 120px;
    height: 40px;
    padding: 8px;
  }
`;

function NavLi({ items, focused, setFocused, hambur }) {
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
        <motion.div
          layoutId="highlight"
          transition={{
            layout: {
              duration: 0.2,
              ease: 'easeOut',
            },
          }}
          style={{
            position: 'absolute',
            top: '-5%',
            left: '-5%',
            width: '110%',
            height: '110%',
            background: `${thirdGray}`,
            borderRadius: '16px',
            zIndex: 1,
          }}
        />
      ) : null}
    </Li>
  ));

  const NavLis = hambur ? (
    <LiContainer hambur={hambur} onMouseLeave={() => setFocused(null)}>
      {Lis}
    </LiContainer>
  ) : (
    <>
      <div />
      {Lis}
    </>
  );
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
