import React, { useState, useEffect } from "react";
import Player from "./RPSJokerAcePlayer";
import RPSRulesModal from "./RPSRulesModal";
import "../RPSJokerAce.css";

const RPSJokerAceGame = ({ onWinner }) => {
  const [playerChoice, setPlayerChoice] = useState("");
  const [cpuChoice, setCpuChoice] = useState("");
  const [result, setResult] = useState("");
  const [playerMatchScore, setPlayerMatchScore] = useState(0);
  const [cpuMatchScore, setCpuMatchScore] = useState(0);
  const [playerChoices] = useState(["rock", "paper", "scissors", "joker", "ace"]);
  const [cpuChoices] = useState(["rock", "paper", "scissors", "joker", "ace"]);
  const [playerUsedChoices, setPlayerUsedChoices] = useState([]);
  const [cpuUsedChoices, setCpuUsedChoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [matchEnded, setMatchEnded] = useState(false);
  const maxRounds = 5;

  useEffect(() => {
    if (playerUsedChoices.length === maxRounds) {
      handleEndMatch();
    }
  }, [playerUsedChoices]); 

  const getCpuChoice = () => {
    const availableCpuChoices = cpuChoices.filter(
      (choice) => !cpuUsedChoices.includes(choice)
    );
    const randomIndex = Math.floor(Math.random() * availableCpuChoices.length);
    return availableCpuChoices[randomIndex];
  };

  const determineWinner = (player, cpu) => {
    if (player === cpu) {
      return "It's a tie!";
    }

    switch (player) {
      case "rock":
        return cpu === "scissors" || cpu === "joker" ? "Player wins!" : "CPU wins!";
      case "paper":
        return cpu === "rock" || cpu === "joker" ? "Player wins!" : "CPU wins!";
      case "scissors":
        return cpu === "paper" || cpu === "joker" ? "Player wins!" : "CPU wins!";
      case "joker":
        return cpu === "ace" ? "Player wins!" : "CPU wins!";
      case "ace":
        return cpu === "rock" || cpu === "paper" || cpu === "scissors" ? "Player wins!" : "CPU wins!";
      default:
        return "Thanks for playing!";
    }
  };

  const playGame = (selectedChoice) => {
    const newCpuChoice = getCpuChoice();
    const gameResult = determineWinner(selectedChoice, newCpuChoice);

    if (gameResult === "Player wins!") {
      setPlayerMatchScore(playerMatchScore + 1);
    } else if (gameResult === "CPU wins!") {
      setCpuMatchScore(cpuMatchScore + 1);
    }

    setPlayerUsedChoices([...playerUsedChoices, selectedChoice]);
    setCpuUsedChoices([...cpuUsedChoices, newCpuChoice]);
    setCpuChoice(newCpuChoice);
    setResult(gameResult);

    if (playerUsedChoices.length === maxRounds) {
      handleEndMatch();
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEndMatch = () => {
    setMatchEnded(true);
    let matchResult;
    if (playerMatchScore > cpuMatchScore) {
      matchResult = "Player wins the game!";
      onWinner();
    } else if (cpuMatchScore > playerMatchScore) {
      matchResult = "CPU wins the game!";
    } else {
      matchResult = "It's a tie game!";
    }
    window.alert(matchResult);
    resetGame();
  };

  const resetGame = () => {
    setPlayerChoice("");
    setCpuChoice("");
    setResult("");
    setPlayerMatchScore(0);
    setCpuMatchScore(0);
    setPlayerUsedChoices([]);
    setCpuUsedChoices([]);
    setShowModal(false);
    setMatchEnded(false);
  };

  return (
    <div className="RPSJokerAce-container">
      <div className="game">
        <h1 className="game-title">Rock, Paper, Scissors, Joker, Ace Game</h1>
        <div className="scoreboard">
          <div className="match-score">
            <p>Player Match Score: {playerMatchScore}</p>
            <p>CPU Match Score: {cpuMatchScore}</p>
          </div>
        </div>
        <div className="player-container">
          <Player
            name="Player"
            choice={playerChoice}
            playGame={playGame}
            availableChoices={playerChoices.filter(
              (choice) => !playerUsedChoices.includes(choice)
            )}
          />
        </div>
        <div className="button-container">
          <button className="rules-btn" onClick={handleShowModal}>
            Rules
          </button>
          {/* {!matchEnded && (
            <button onClick={() => playGame(playerChoice)} disabled={!playerChoice}>
              Play
            </button>
          )}*/
          <button onClick={resetGame}>Refresh</button> }
        </div>
        <div className="cpu-container">
          {cpuChoice && <p>CPU chose: {cpuChoice}</p>}
        </div>
        {result && <h2>{result}</h2>}
        <RPSRulesModal show={showModal} handleClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default RPSJokerAceGame;
