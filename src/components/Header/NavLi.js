/* eslint-disable react/forbid-prop-types */
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import styled from 'styled-components';
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
          <RouteLink
            to={item.to}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              lineHeight: '3rem',
              textAlign: 'center',
              zIndex: 2,
            }}
          >
            {item.title}
          </RouteLink>
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
