import styled from 'styled-components';
import { primaryGray, primaryYellow } from './color.js';

export const AuthButton = styled.button`
  margin-top: 25px;
  width: 300px;
  border-radius: 25px;
  height: 53px;
  padding: 10px;
  border: none;
  outline: none;
  background: ${primaryYellow};
  opacity: 0.7;
  color: white;
  font-weight: bold;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

export const StartButton = styled.a`
  display: block;
  margin: 52px auto 8px;
  width: 300px;
  border-radius: 5px;
  height: auto;
  padding: 20px;
  font-size: 1.2rem;
  line-height: 1.5rem;
  background: black;
  color: white;
  border: 1px solid black;

  :hover {
    color: black;
    background: white;
    font-weight: bold;
  }
`;

export const UploadButton = styled.button`
  width: 40vw;
  margin: 20px;
  padding: 16px;
  border: 4px solid ${primaryYellow};
  border-radius: 8px;
  background: white;
  color: ${primaryGray};
  font-size: 1.2rem;
  font-weight: bold;
  &:hover {
    background: ${primaryYellow};
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;
