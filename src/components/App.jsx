// import Game from './Game';
import styled from 'styled-components';
import { Cell } from './Cell.jsx';

const BOARD_SIZE = 10;
const DEFAULT_CELLS_VALUE = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0));

export const App = () => {
  return (
    <div>
      {DEFAULT_CELLS_VALUE.map((row, indexR) => (
        <RowWrap key={indexR}>
          {row.map((cell, indexC) => {
            return <Cell key={indexC} />;
          })}
        </RowWrap>
      ))}
    </div>
  );
};

const RowWrap = styled.div`
  display: flex;
`;
