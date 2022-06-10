import styled from 'styled-components';
import { Element } from 'react-scroll';
import { primaryGray, secondaryGray } from './color.js';

export const Block = styled.div`
  display: block;
  width: 80%;
  margin: 1.5rem auto;
  height: auto;
`;

export const EditBlock = styled(Block)`
  margin: 3rem auto;
  width: 60%;
  border-radius: 8px;
  border: 8px solid white;
  @media (max-width: 600px) {
    width: 80%;
  }
`;

export const Title = styled.div`
  width: 80%;
  margin: 8vh auto 0px;
  padding: 12px 0px;
  height: 10vh;
  line-height: 9vh;
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  @media (max-width: 600px) {
    margin: 2vh auto 1vh;
  }
`;
export const Main = styled.div`
  height: auto;
  min-height: 20vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const TextArea = styled.div`
  height: 45vh;
  width: 50%;
  border: 3px solid transparent;
  border-image: linear-gradient(to right, ${primaryGray}, rgba(0, 0, 0, 0)) 1 0%;

  @media (max-width: 600px) {
    width: 100%;
    margin: 1rem 0;
    border-image: linear-gradient(to bottom, ${primaryGray}, rgba(0, 0, 0, 0)) 1
      100%;
  }
`;

export const ImgArea = styled.div`
  width: 50%;
  height: 45vh;
  display: block;
  text-align: center;
  @media (max-width: 600px) {
    width: 100%;
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
  margin: 0.5rem auto;
  padding: 2px;
  width: 50%;
  text-align: center;
  background-color: #e87191;
  color: white;
  font-size: 0.7rem;
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

export const ListTitle = styled(Element)`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const ListDetails = styled.div`
  font-size: 1.2rem;
  line-height: 1.5rem;
`;

export const Breadcrumbs = styled.ol`
  flex: 0 0 30vw;
  display: flex;
  align-items: center;
  li {
    margin: 0 1vw;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;
