/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import NavLi from './NavLi.js';

const Ul = styled.ul`
  display: flex;
  justify-content: flex-end;
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
  const [navOpen, setNavOpen] = useState(false);
  const [focused, setFocused] = useState('');

  const handleCLick = () => {
    setNavOpen((prev) => !prev);
  };
  return (
    <>
      <Ul style={{ flex: `${flex}` }} onMouseLeave={() => setFocused(null)}>
        <NavLi
          items={items}
          flexDirection="column"
          focused={focused}
          setFocused={setFocused}
        />
      </Ul>
      <HamUl onClick={() => handleCLick()}>123</HamUl>
      {navOpen && (
        <NavLi
          items={items}
          flexDirection="row"
          focused={focused}
          setFocused={setFocused}
        />
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
