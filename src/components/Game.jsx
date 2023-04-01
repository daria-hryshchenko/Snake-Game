import React, { useState, useEffect, useCallback } from 'react';

import {
  GameContainer,
  Grid,
  Row,
  Cell,
  Food,
  //   ButtonContainer,
  //   Button,
} from './Game.styled';

const ROWS = 20;
const COLS = 20;

const initialSnake = [
  { row: ROWS / 2, col: COLS / 2 },
  { row: ROWS / 2, col: COLS / 2 - 1 },
  { row: ROWS / 2, col: COLS / 2 - 2 },
];

const initialFood = {
  row: Math.floor(Math.random() * ROWS),
  col: Math.floor(Math.random() * COLS),
};

const Game = () => {
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState('right');
  const [gamePaused, setGamePaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const moveSnake = useCallback(() => {
    if (!gamePaused && !gameOver) {
      const head = { ...snake[0] };
      switch (direction) {
        case 'up':
          head.row -= 1;
          break;
        case 'down':
          head.row += 1;
          break;
        case 'left':
          head.col -= 1;
          break;
        case 'right':
          head.col += 1;
          break;
        default:
          break;
      }
      const newSnake = [head, ...snake.slice(0, -1)];
      setSnake(newSnake);
    }
  }, [direction, gameOver, gamePaused, snake]);

  const handleKeyPress = event => {
    if (
      ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
    ) {
      event.preventDefault();
    }
    const newDirection = event.key.replace('Arrow', '').toLowerCase();
    setDirection(newDirection);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      moveSnake();
    }, 500);
    return () => clearInterval(intervalId);
  }, [moveSnake]);

  return (
    <GameContainer>
      <h1>Snake Game</h1>
      <Grid>
        {Array.from({ length: ROWS }).map((_, rowIndex) => (
          <Row key={rowIndex}>
            {Array.from({ length: COLS }).map((_, colIndex) => (
              <Cell
                key={`${rowIndex},${colIndex}`}
                isSnake={snake.some(
                  snakeCell =>
                    snakeCell.row === rowIndex && snakeCell.col === colIndex
                )}
              >
                {food.row === rowIndex && food.col === colIndex && <Food />}
              </Cell>
            ))}
          </Row>
        ))}
      </Grid>
    </GameContainer>
  );
};

export default Game;
