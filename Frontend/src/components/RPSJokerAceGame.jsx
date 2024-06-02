import React, { useState } from 'react';
import Player from './RPSJokerAcePlayer';
import '../RPSJokerAce.css';

const RPSJokerAceGame = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [cpuChoice, setCpuChoice] = useState('');
  const [result, setResult] = useState('');
  const [disabledOptions, setDisabledOptions] = useState([]);

  const choices = ["rock", "paper", "scissors", "joker", "ace"];

  const getCpuChoice = () => {
    const availableChoices = choices.filter(choice => !disabledOptions.includes(choice));
    const randomIndex = Math.floor(Math.random() * availableChoices.length);
    const randomChoice = availableChoices[randomIndex];
    setCpuChoice(randomChoice);
    return randomChoice;
  };

  const determineWinner = (player, cpu) => {
    if (player === cpu) {
      return "It's a tie!";
    }

    switch (player) {
      case 'rock':
        switch (cpu) {
          case 'scissors':
          case 'joker':
            return 'Player wins!';
          case 'paper':
          case 'ace':
            return 'CPU wins!';
          default:
            return "It's a tie!";
        }
      case 'paper':
        switch (cpu) {
          case 'rock':
          case 'joker':
            return 'Player wins!';
          case 'scissors':
          case 'ace':
            return 'CPU wins!';
          default:
            return "It's a tie!";
        }
      case 'scissors':
        switch (cpu) {
          case 'paper':
          case 'joker':
            return 'Player wins!';
          case 'rock':
          case 'ace':
            return 'CPU wins!';
          default:
            return "It's a tie!";
        }
      case 'joker':
        switch (cpu) {
          case 'ace':
            return 'Player wins!';
          default:
            return 'CPU wins!';
        }
      case 'ace':
        switch (cpu) {
          case 'rock':
          case 'paper':
          case 'scissors':
            return 'Player wins!';
          case 'joker':
            return 'CPU wins!';
          default:
            return "It's a tie!";
        }
      default:
        return "Invalid choice!";
    }
  };

  const playGame = () => {
    const cpuChoice = getCpuChoice();
    const gameResult = determineWinner(playerChoice, cpuChoice);
    setResult(gameResult);
    setDisabledOptions(prevDisabledOptions => [...prevDisabledOptions, playerChoice]);
  };

  return (
    <div className="game">
      <h1>Rock, Paper, Scissors, Joker, Ace Game</h1>
      <Player name="Player" choice={playerChoice} setChoice={setPlayerChoice} disabledOptions={disabledOptions} />
      <div className="cpu">
        <h2>CPU</h2>
        <p>{cpuChoice}</p>
      </div>
      <button onClick={playGame} disabled={!playerChoice}>
        Play
      </button>
      {result && <h2>{result}</h2>}
    </div>
  );
};

export default RPSJokerAceGame;
