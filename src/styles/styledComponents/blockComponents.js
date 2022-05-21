import styled from 'styled-components';

export const Block = styled.div`
  display: block;
  width: 80%;
  margin: 0 auto;
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
  height: 90vh;
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
