import React, { useState } from 'react';
import Square from './Square';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    const newSquares = squares.slice();
    if (newSquares[index] || calculateWinner(newSquares)) {
      return;
    }
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => {
    const winnerInfo = calculateWinner(squares);
    const isWinningSquare = winnerInfo && winnerInfo.includes(index);

    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => handleClick(index)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  const winner = calculateWinner(squares);
  let status;
 
  if (winner) {
  
    status = `Winner: ${squares[winner[0]]}`;
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
    
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="game-board">
        {squares.map((_, index) => renderSquare(index))}
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
};

export default Board;
