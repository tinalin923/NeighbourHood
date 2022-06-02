import styled from 'styled-components';
import { secondaryGray } from './color.js';

export const Block = styled.div`
  display: block;
  width: 80%;
  margin: 0 auto;
  height: auto;
`;
export const Title = styled.div`
  width: 80%;
  margin: 8vh auto 2vh;
  padding: 12px 0px;
  height: 10vh;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
export const Main = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 50vh;
  height: auto;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 40vh;
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
  background-color: ${secondaryGray};
  text-align: center;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export const ImageError = styled.p`
  margin: 8% auto;
  border: 2px solid #e87191;
  padding: 4px;
  width: 50%;
  text-align: center;
  background-color: #e87191;
  color: white;
  font-size: 0.9rem;
`;

export const TextError = styled.p`
  margin: 4px auto;
  border: 2px solid #e87191;
  padding: 4px;
  width: 150px;
  text-align: center;
  color: #e87191;
  font-size: 0.9rem;
`;
