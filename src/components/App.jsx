import React, { useState, useEffect } from 'react';
import './App.css';

const BOARD_SIZE = 10;
const DEFAULT_CELLS_VALUE = Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0));
const AVAILEBLE_MOVES = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
const SPEED = 500;

const checkAvaibleSlot = position => {
  switch (true) {
    case position >= BOARD_SIZE:
      return 0;
    case position < 0:
      return BOARD_SIZE - 1;
    default:
      return position;
  }
};

export const App = () => {
  const [snake, setSnake] = useState([[1, 1]]);
  const [food, setFood] = useState([0, 0]);
  const [direction, setDirection] = useState(AVAILEBLE_MOVES[0]);
  const [gamePaused, setGamePaused] = useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);

  const handleKeyDown = event => {
    const index = AVAILEBLE_MOVES.indexOf(event.key);
    if (index > -1) {
      setDirection(AVAILEBLE_MOVES[index]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!gamePaused) {
      const interval = gameLoop();
      return () => clearInterval(interval);
    }
  });

  const generatedFood = () => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * BOARD_SIZE),
        Math.floor(Math.random() * BOARD_SIZE),
      ];
    } while (
      // eslint-disable-next-line no-loop-func
      snake.some(elem => elem[0] === newFood[0] && elem[1] === newFood[1])
    );
    setFood(newFood);
  };

  const gameLoop = () => {
    const timerId = setTimeout(() => {
      const newSnake = snake;
      let move = [];

      switch (direction) {
        case AVAILEBLE_MOVES[0]:
          move = [1, 0];
          break;
        case AVAILEBLE_MOVES[1]:
          move = [-1, 0];
          break;
        case AVAILEBLE_MOVES[2]:
          move = [0, -1];
          break;
        case AVAILEBLE_MOVES[3]:
          move = [0, 1];
          break;
        default:
          break;
      }

      const head = [
        checkAvaibleSlot(newSnake[newSnake.length - 1][0] + move[0]),
        checkAvaibleSlot(newSnake[newSnake.length - 1][1] + move[1]),
      ];

      newSnake.push(head);
      let spliceIndex = 1;
      if (head[0] === food[0] && head[1] === food[1]) {
        spliceIndex = 0;
        generatedFood();
      }
      setSnake(newSnake.slice(spliceIndex));
    }, SPEED);

    return timerId;
  };

  if (!gameStarted) {
    return (
      <section className="game-started">
        <div className="start-container">
          <button onClick={() => setGameStarted(true)} className="btn-start">
            Start Game
          </button>
          <iframe
            src="https://giphy.com/embed/3oKIPCohynIR4gBdhm"
            className="snake-gif"
            title="snake-gif"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    );
  }

  const handlePauseClick = () => {
    setGamePaused(!gamePaused);
  };

  return (
    <div>
      <div className="game-head">
        <h1 className="title-result">Result: {snake.length}</h1>
        <button onClick={handlePauseClick} className="button-play">
          {gamePaused ? 'Resume' : 'Pause'}
        </button>
      </div>
      {DEFAULT_CELLS_VALUE.map((row, indexR) => (
        <div className="row" key={indexR}>
          {row.map((cell, indexC) => {
            let type =
              snake.some(elem => elem[0] === indexR && elem[1] === indexC) &&
              'snake';
            if (type !== 'snake') {
              type = food[0] === indexR && food[1] === indexC && 'food';
            }
            return <div key={indexC} type={type} className={`cell ${type}`} />;
          })}
        </div>
      ))}
    </div>
  );
};
