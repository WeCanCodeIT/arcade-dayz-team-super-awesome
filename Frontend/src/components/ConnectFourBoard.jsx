import React, { useReducer, useState } from "react";
import ConnectFourSlot from "./ConnectFourSlot";
import "./ConnectFourBoard.css";

const numRows = 6;
const numCols = 7;

const initialGameState = {
  player1: "Player 1",
  player2: "Player 2",
  currentPlayer: "Player 1",
  board: Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(null)),
  gameOver: false,
  message: "",
};

const calculateWinner = (board) => {
  const checkLine = (a, b, c, d) => {
    return a !== null && a === b && a === c && a === d;
  };

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols - 3; col++) {
      if (
        checkLine(
          board[row][col],
          board[row][col + 1],
          board[row][col + 2],
          board[row][col + 3]
        )
      ) {
        return board[row][col];
      }
    }
  }

  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows - 3; row++) {
      if (
        checkLine(
          board[row][col],
          board[row + 1][col],
          board[row + 2][col],
          board[row + 3][col]
        )
      ) {
        return board[row][col];
      }
    }
  }

  for (let row = 0; row < numRows - 3; row++) {
    for (let col = 0; col < numCols - 3; col++) {
      if (
        checkLine(
          board[row][col],
          board[row + 1][col + 1],
          board[row + 2][col + 2],
          board[row + 3][col + 3]
        )
      ) {
        return board[row][col];
      }
    }
  }

  for (let row = 3; row < numRows; row++) {
    for (let col = 0; col < numCols - 3; col++) {
      if (
        checkLine(
          board[row][col],
          board[row - 1][col + 1],
          board[row - 2][col + 2],
          board[row - 3][col + 3]
        )
      ) {
        return board[row][col];
      }
    }
  }

  return null;
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "DROP_TOKEN":
      const newBoard = state.board.map((row) => row.slice());
      for (let rowIndex = numRows - 1; rowIndex >= 0; rowIndex--) {
        if (newBoard[rowIndex][action.colIndex] === null) {
          newBoard[rowIndex][action.colIndex] = state.currentPlayer;
          const winner = calculateWinner(newBoard, action.colIndex, rowIndex);
          const gameOver = winner !== null;
          const message = gameOver
            ? `Game Over! ${
                state.currentPlayer === "Player 1"
                  ? "Player 1 Wins!"
                  : "Player 2 Wins!"
              }`
            : "";
          return {
            ...state,
            board: newBoard,
            gameOver,
            message,
            currentPlayer:
              state.currentPlayer === "Player 1" ? "Player 2" : "Player 1",
          };
        }
      }
      return state;
    case "RESET_GAME":
      return initialGameState;
    default:
      return state;
  }
};

const ConnectFourBoard = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const [startClicked, setStartClicked] = useState(false);

  const handleDrop = (colIndex) => {
    if (!gameState.gameOver) {
      dispatch({ type: "DROP_TOKEN", colIndex });
    }
  };

  const handleStart = () => {
    dispatch({ type: "RESET_GAME" });
    setStartClicked(true);
  };

  return (
    <div className="board">
      <h1 className="title">Welcome to Connect Four!</h1>
      {!startClicked && (
        <button className="start-button" onClick={handleStart}>
          Start Game
        </button>
      )}
      {gameState.message && <div className="message">{gameState.message}</div>}
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
      {gameState.gameOver && (
        <button className="try-again-button" onClick={handleStart}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ConnectFourBoard;
