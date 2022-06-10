import { keyframes } from 'styled-components';

export const slideDown = keyframes`
  from {
    transform: translateY(-5%);
  }
  to {
    transform: translateY(0);
  }
`;

export const slideIn = keyframes`
  from{
    transform: translateX(100%);
  }
  to{
    transform: translateX(0px);
  }
`;
