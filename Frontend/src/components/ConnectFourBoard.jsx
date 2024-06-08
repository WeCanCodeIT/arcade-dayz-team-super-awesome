import React, { useReducer } from 'react';
import ConnectFourSlot from './ConnectFourSlot';
import './ConnectFourBoard.css';

const numRows = 6;
const numCols = 7;

const initialGameState = {
  player1: 'Red',
  player2: 'Yellow',
  currentPlayer: 'Red',
  board: Array(numRows).fill(Array(numCols).fill(null)),
  gameOver: false,
  message: '',
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'DROP_TOKEN':
      const newBoard = state.board.map(row => row.slice());
      for (let rowIndex = numRows - 1; rowIndex >= 0; rowIndex--) {
        if (newBoard[rowIndex][action.colIndex] === null) {
          newBoard[rowIndex][action.colIndex] = state.currentPlayer;
          const nextPlayer = state.currentPlayer === 'Red' ? 'Yellow' : 'Red';
          return { ...state, board: newBoard, currentPlayer: nextPlayer };
        }
      }
      return state;
    case 'RESET_GAME':
      return initialGameState;
    default:
      return state;
  }
};

const ConnectFourBoard = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  const handleDrop = (colIndex) => {
    dispatch({ type: 'DROP_TOKEN', colIndex });
  };

  return (
    <div className="board">
      {gameState.board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((slot, colIndex) => (
            <ConnectFourSlot
              key={colIndex}
              value={slot}
              onClick={() => handleDrop(colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ConnectFourBoard;
