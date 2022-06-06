/* eslint-disable react/forbid-prop-types */
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import styled from 'styled-components';
import { primaryGray, thirdGray } from '../../styles/styledComponents/color.js';

const Li = styled.li`
  position: relative;
  margin: 8px;
  display: block;
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

function NavTab({ items, flex }) {
  const [focused, setFocused] = useState();
  return (
    <ul
      style={{ display: 'flex', flex: `${flex}`, justifyContent: 'flex-end' }}
      onMouseLeave={() => setFocused(null)}
    >
      {items.map((item) => (
        <Li
          key={item.title}
          as={RouteLink}
          to={item.to}
          onClick={item.onClick}
          onMouseEnter={() => setFocused(item.title)}
        >
          <span
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              textAlign: 'center',
              zIndex: 2,
            }}
          >
            {item.title}
          </span>
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
    </ul>
  );
}

NavTab.propTypes = {
  items: PropTypes.array.isRequired,
  flex: PropTypes.string,
};

NavTab.defaultProps = {
  flex: 'none',
};

export default NavTab;
