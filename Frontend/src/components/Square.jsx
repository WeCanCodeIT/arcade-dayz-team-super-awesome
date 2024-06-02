import React from 'react';

const Square = ({ value, onClick, isWinningSquare }) => {
  const className = `square ${value ? 'populated' : ''} ${value ? value.toLowerCase() : ''} ${isWinningSquare ? 'winner' : ''}`;

  return (
    <button className={className} onClick={onClick}>
      <span className="square-content">{value}</span>
    </button>
  );
};

export default Square;
