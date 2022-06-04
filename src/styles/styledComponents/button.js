import styled from 'styled-components';
import { primaryYellow } from './color.js';

export const Button = styled.button`
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
  :hover {
    color: black;
    background: white;
    font-weight: bold;
  }
`;
