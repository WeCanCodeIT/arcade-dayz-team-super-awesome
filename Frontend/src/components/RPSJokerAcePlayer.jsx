import React from 'react';
import '../RPSJokerAce.css'; 

const Player = ({ name, choice, setChoice, availableChoices }) => {
  const handleChoice = (event) => {
    setChoice(event.target.value);
  };

  return (
    <div className="player">
      <h2>{name}</h2>
      <select value={choice} onChange={handleChoice}>
        <option value="">Select</option>
        {availableChoices.map(choice => (
          <option
            key={choice}
            value={choice}
            disabled={choice === '' || choice === null}
            className={choice === '' || choice === null ? '' : 'disabled'}
          >
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Player;
