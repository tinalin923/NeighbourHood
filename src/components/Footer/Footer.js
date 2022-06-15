import React from 'react';
import styled from 'styled-components';
import {
  backgroundGray,
  secondaryGray,
} from '../../styles/styledComponents/color.js';
import github from '../../assets/images/icons8-github-60.png';
import gmail from '../../assets/images/icons8-gmail-48.png';
import linkedin from '../../assets/images/icons8-linkedin-48.png';

const Footerbar = styled.footer`
  width: 100%;
  height: auto;
  background: ${secondaryGray};
`;
const LinkArea = styled.div`
  min-height: 5rem;
  width: 80%;
  margin: 0px auto;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const A = styled.a`
  margin: 0.5rem 0rem 0.5rem 1.5rem;
  text-decoration: none;
  color: ${backgroundGray};
`;

const Infromation = styled.div`
  width: 80%;
  margin: 10px auto;
  border-top: 2px solid ${backgroundGray};
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const Img = styled.img`
  width: 24px;
  height: 24px;
  margin: 1rem;
`;

function Footer() {
  return (
    <Footerbar>
      <LinkArea>
        <A href="/">Home</A>
        <A href="/totalvillages">Total Villages</A>
        <A href="/signup">Sign up</A>
        <A href="/login">Login in</A>
      </LinkArea>
      <Infromation>
        <div>
          <a href="https://github.com/tinalin923/NeighbourHood">
            <Img alt="" src={github} />
          </a>
          <a href="mailto:tinalin923@gmail.com">
            <Img alt="" src={gmail} />
          </a>
          <a href="https://www.linkedin.com/in/yi-jun-lin-353a14226/">
            <Img alt="" src={linkedin} />
          </a>
        </div>
        <p>COPYRIGHT © 2022 NeighbourHood</p>
      </Infromation>

      <div />
    </Footerbar>
  );
}

export default Footer;
