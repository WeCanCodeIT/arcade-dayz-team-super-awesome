import React from 'react';

const ConnectFourSlot = ({ value, onClick }) => {
  const colorClass = value === 'Player 1' ? 'player1' : value === 'Player 2' ? 'player2' : '';
  return (
    <div className={`slot ${colorClass}`} onClick={onClick} />
  );
};

export default ConnectFourSlot;
