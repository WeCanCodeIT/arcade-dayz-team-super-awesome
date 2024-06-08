import React, { useState } from 'react';
import RPSJokerAceGame from '../components/RPSJokerAceGame';
import '../RPSJokerAce.css';

const RPSJokerAcePage = () => {
  const [refreshData, setRefreshData] = useState(false);

  const handleRefresh = () => {
    setRefreshData(!refreshData);
  };

  return (
    <div className="rps-joker-ace-page">
      <div className="RPSJokerace-background"></div>
      <div className="game-title">
      </div>
      <RPSJokerAceGame key={refreshData} handleRefresh={handleRefresh} />
    </div>
  );
};

export default RPSJokerAcePage;
