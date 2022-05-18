import styled from 'styled-components';

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

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  height: 90vh;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 160vh;
  }
`;

export const Title = styled.div`
  margin-top: 5vh;
  padding: 10px 0px;
  width: auto;
  height: 10vh;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
