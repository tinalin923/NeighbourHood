/* eslint-disable react/forbid-prop-types */
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/scss/header.scss';
import { primaryGray, thirdGray } from '../../styles/styledComponents/color.js';

const Li = styled.li`
  position: relative;
  margin: 8px;
  display: flex;
  flexdirection: ${({ flexDirection }) =>
    flexDirection === 'column' ? 'column' : 'row'};
  width: 8vw;
  height: 48px;
  border: none;
  text-decoration: none;
  color: ${primaryGray};
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

function NavLi({ items, flexDirection, focused, setFocused }) {
  return (
    <>
      {items.map((item) => (
        <Li
          flexDirection={flexDirection}
          key={item.title}
          onClick={item.onClick}
          onMouseEnter={() => setFocused(item.title)}
        >
          <NavLink
            className={(navData) => (navData.isActive ? 'active' : 'notActive')}
            to={item.to}
          >
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
      ))}
    </>
  );
}

NavLi.propTypes = {
  items: PropTypes.array.isRequired,
  flexDirection: PropTypes.string.isRequired,
  focused: PropTypes.string,
  setFocused: PropTypes.func.isRequired,
};

NavLi.defaultProps = {
  focused: null,
};

export default NavLi;
