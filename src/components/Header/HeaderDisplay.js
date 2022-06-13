import styled from 'styled-components';
import { primaryGray } from '../../styles/styledComponents/color.js';
import { slideDown } from '../../styles/styledComponents/keyframes.js';

export const Top = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 0px 2px;
  background: white;
  animation: ${slideDown} 0.2s;
  z-index: 11;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px;
  height: 80px;
  @media (max-width: 600px) {
    justify-content: space-around;
  }
`;

export const Title = styled.div`
  flex: 0 0 30vw;
  text-decoration: none;
  text-align: center;
  font-family: 'TESLA Regular';
  font-size: 1.2rem;

  color: ${primaryGray};
  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    font-size: 1rem;
  }
`;

export const Icon = styled.div`
  @media (min-width: 600px) {
    display: none;
  }
`;
