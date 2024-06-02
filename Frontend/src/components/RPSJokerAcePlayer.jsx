import React from 'react';

const Player = ({ name, choice, setChoice, disabledOptions }) => {
  const handleChoice = (event) => {
    setChoice(event.target.value);
  };

  return (
    <div className="player">
      <h2>{name}</h2>
      <select value={choice} onChange={handleChoice}>
        <option value="">Select</option>
        <option value="rock" disabled={disabledOptions.includes("rock")}>Rock</option>
        <option value="paper" disabled={disabledOptions.includes("paper")}>Paper</option>
        <option value="scissors" disabled={disabledOptions.includes("scissors")}>Scissors</option>
        <option value="joker" disabled={disabledOptions.includes("joker")}>Joker</option>
        <option value="ace" disabled={disabledOptions.includes("ace")}>Ace</option>
      </select>
    </div>
  );
};

export default Player;
