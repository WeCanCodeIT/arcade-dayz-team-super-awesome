import React from 'react';
import '../RPSJokerAce.css';

const Player = ({ name, choice, playGame, availableChoices }) => {
  const handleChoice = (selectedChoice) => {
    playGame(selectedChoice);
  };

  return (
    <div className="player">
      <h2>{name}</h2>
      <div className="card-row">
        {availableChoices.map(card => (
          <div
            key={card}
            className={`card ${card} ${card === choice ? 'selected' : ''}`}
            onClick={() => handleChoice(card)}
            style={{ 
              opacity: card === '' || card === null ? 0.5 : 1, 
              pointerEvents: card === '' || card === null ? 'none' : 'auto'
            }}
          >
            <img src={`../images/${card}.png`} alt={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;
