import styled, { createGlobalStyle } from 'styled-components';
import Background from '../../assets/images/compress-toa-heftiba-nrSzRUWqmoI-unsplash-min.jpg';

export const GlobalStyle = createGlobalStyle`
  html {
    margin: 0px;
    height: 100%;
    background-image: url(${Background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

export const Form = styled.div`
  width: 400px;
  margin: 15vh auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(245, 245, 245, 0.9);
  border-radius: 8px;
  @media (max-width: 600px) {
    width: 80%;
  }
`;
export const Block = styled.div`
  margin-top: 20px;
  width: 80%;
  border-radius: 25px;
  background-color: #d4d6dd;
  opacity: 0.8;
`;
export const Input = styled.input`
  height: 53px;
  width: 80%;
  padding: 10px;
  border: none;
  outline: none;
  background: transparent;
  color: #16181d;
`;
export const icon = {
  position: 'relative',
  left: '5px',
  top: '8px',
  padding: '9px 8px',
  opacity: '0.8',
};
export const Err = styled.div`
  width: 80%;
  margin-top: 12px;
  display: flex;
  align-items: center;
  color: red;
  svg {
    margin: 4px;
    path {
      fill: red;
    }
  }
`;

export const P = styled.p`
  margin: 8px;
  text-decoration: none;
  border-radius: 4px;
  padding: 4px;

  color: black;
  font-size: 0.8rem;
  :hover {
    font-weight: bold;
  }
`;

export const Select = styled.select`
  height: 53px;
  width: 80%;
  padding: 10px;
  border: none;
  outline: none;
  background-color: transparent;
  color: #16181d;
`;

export const Option = styled.option`
  background-color: transparent;
  color: #16181d;
  appearance: none;
  &:hover {
    background-color: transparent;
  }
`;
