import styled from 'styled-components';
import { secondaryGray } from './color.js';

export const Block = styled.div`
  display: block;
  width: 80%;
  margin: 0 auto;
  height: auto;
`;
export const Title = styled.div`
  padding: 15px 0px;
  height: 10vh;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
export const Main = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 90vh;
  height: auto;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 160vh;
  }
`;

export const ImgArea = styled.div`
  margin-top: 3vh;
  height: 70vh;
  width: 35vw;
  display: block;
  text-align: center;
  @media (max-width: 600px) {
    width: 80vw;
  } ;
`;

export const SecondaryBtn = styled.button`
  margin: 10px auto;
  border: none;
  border-radius: 5px;
  padding: 5px;
  background-color: ${secondaryGray};
  opacity: 0.8;
  text-align: center;
  color: black;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;
