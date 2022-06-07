/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import NavLi from './NavLi.js';

const Ul = styled.ul`
  display: flex;
  align-items: flex-end;
  @media (max-width: 600px) {
    display: none;
  }
`;

const HamUl = styled.ul`
  @media (min-width: 600px) {
    display: none;
  }
`;

function NavUl({ items, flex }) {
  // for hambur icon
  const [clicked, setClicked] = useState(false);
  // for  hambur li present
  const [navOpen, setNavOpen] = useState(false);
  // for framer-motion hover
  const [focused, setFocused] = useState('');

  const handleCLick = () => {
    setNavOpen((prev) => !prev);

    if (clicked) {
      setClicked('');
    } else {
      setClicked('icon-active');
    }
  };

  return (
    <>
      <Ul onMouseLeave={() => setFocused(null)} style={{ flex: `${flex}` }}>
        <NavLi
          items={items}
          hambur={false}
          focused={focused}
          setFocused={setFocused}
        />
      </Ul>

      <HamUl onClick={() => handleCLick()} style={{ flex: '0 1 10vw' }}>
        <svg
          id="burgericon"
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 100 100"
        >
          <g className={clicked || 'icon'}>
            <rect
              className="frstbar"
              x="35"
              y="28"
              width="60"
              height="8"
              rx="7"
              ry="7"
            />
            <rect
              className="scndbar"
              x="35"
              y="46"
              width="60"
              height="8"
              rx="7"
              ry="7"
            />
            <rect
              className="thrdbar"
              x="35"
              y="64"
              width="60"
              height="8"
              rx="7"
              ry="7"
            />
          </g>
        </svg>
      </HamUl>
      {navOpen && (
        <NavLi items={items} hambur focused={focused} setFocused={setFocused} />
      )}
    </>
  );
}

NavUl.propTypes = {
  items: PropTypes.array.isRequired,
  flex: PropTypes.string,
};

NavUl.defaultProps = {
  flex: 'none',
};

export default NavUl;
