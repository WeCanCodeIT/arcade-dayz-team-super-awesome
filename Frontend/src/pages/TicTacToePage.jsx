// src/pages/TicTacToePage.jsx
import React, { useState } from 'react';
import Board from '../components/Board';
import './TicTacToePage.jsx';

const TicTacToePage = () => {
  const [refreshData, setRefreshData] = useState(false);

  const handleRefresh = () => {
    setRefreshData(!refreshData);
  };

  return (
    <div className="tic-tac-toe-page">
    <div className="game-title">
      <h1>Tic Tac Toe</h1>
      </div>
      <Board key={refreshData} />
      <button className="refresh-btn" onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

export default TicTacToePage;
