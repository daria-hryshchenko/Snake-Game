import styled from 'styled-components';

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  margin: 50px auto;
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
`;

export const Cell = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  background-color: ${props => (props.isSnake ? '#32CD32' : 'white')};
`;

export const Food = styled.div`
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  margin: auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #32cd32;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #228b22;
  }
`;

export const GameOverMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2rem;
  z-index: 9999;
`;
