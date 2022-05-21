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

export const addButton = styled.button``;
