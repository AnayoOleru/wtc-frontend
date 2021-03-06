import styled from 'styled-components';

export const StyledAverage = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h3 {
    font-family: 'Lexend Giga', sans-serif;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  p {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #03525b;
    font-family: 'Lexend Giga', sans-serif;
    margin: 20px 0;
  }
  span {
    color: #03525b;
    display: block;
    margin: 0 0 20px 0;
  }
  button {
    width: 130px;
    height: 50px;
    background-color: #56c1cb;
    font-size: 10px;
    font-weight: 600;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin: 0 5px;
  }
  @media (min-width: 600px) {
    margin: 20px;
    h3 {
      font-size: 36px;
    }
    p {
      font-size: 1.5rem;
    }
    button {
      width: 150px;
      font-size: 12px;
    }
  }
  @media (min-width: 1100px) {
    margin: 20px;
   
    p {
      font-size: 2rem;
    }
   
  }
`;
