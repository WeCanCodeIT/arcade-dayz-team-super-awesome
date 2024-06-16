import React, { useState } from "react";
import Player from "./RPSJokerAcePlayer";
import RPSRulesModal from "./RPSRulesModal";
import "../RPSJokerAce.css";

const RPSJokerAceGame = () => {
  const [playerChoice, setPlayerChoice] = useState("");
  const [cpuChoice, setCpuChoice] = useState("");
  const [result, setResult] = useState("");
  const [playerMatchScore, setPlayerMatchScore] = useState(0);
  const [cpuMatchScore, setCpuMatchScore] = useState(0);
  const [playerChoices] = useState([
    "rock",
    "paper",
    "scissors",
    "joker",
    "ace",
  ]);
  const [cpuChoices] = useState([
    "rock",
    "paper",
    "scissors",
    "joker",
    "ace",
  ]);
  const [playerUsedChoices, setPlayerUsedChoices] = useState([]);
  const [cpuUsedChoices, setCpuUsedChoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [matchEnded, setMatchEnded] = useState(false);

  const getCpuChoice = () => {
    const availableCpuChoices = cpuChoices.filter(
      (choice) => !cpuUsedChoices.includes(choice)
    );
    const randomIndex = Math.floor(Math.random() * availableCpuChoices.length);
    const randomChoice = availableCpuChoices[randomIndex];
    return randomChoice;
  };

  const determineWinner = (player, cpu) => {
    if (player === cpu) {
      return "It's a tie!";
    }

    switch (player) {
      case "rock":
        switch (cpu) {
          case "scissors":
          case "joker":
            return "Player wins!";
          case "paper":
          case "ace":
            return "CPU wins!";
        }
      case "paper":
        switch (cpu) {
          case "rock":
          case "joker":
            return "Player wins!";
          case "scissors":
          case "ace":
            return "CPU wins!";
        }
      case "scissors":
        switch (cpu) {
          case "paper":
          case "joker":
            return "Player wins!";
          case "rock":
          case "ace":
            return "CPU wins!";
        }
      case "joker":
        switch (cpu) {
          case "ace":
            return "Player wins!";
          default:
            return "CPU wins!";
        }
      case "ace":
        switch (cpu) {
          case "rock":
          case "paper":
          case "scissors":
            return "Player wins!";
          case "joker":
            return "CPU wins!";
        }
      default:
        return "Thanks for playing!";
    }
  };

  const playGame = () => {
    const newCpuChoice = getCpuChoice();
    const gameResult = determineWinner(playerChoice, newCpuChoice);

    if (gameResult === "Player wins!") {
      setPlayerMatchScore(playerMatchScore + 1);
    } else if (gameResult === "CPU wins!") {
      setCpuMatchScore(cpuMatchScore + 1);
    } else {
      setPlayerMatchScore(playerMatchScore);
      setCpuMatchScore(cpuMatchScore);
    }

    setPlayerUsedChoices([...playerUsedChoices, playerChoice]);
    setCpuUsedChoices([...cpuUsedChoices, newCpuChoice]);
    setCpuChoice(newCpuChoice);
    setResult(gameResult);

    if (playerUsedChoices.length === 5) { 
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
    } else if (cpuMatchScore > playerMatchScore) {
      matchResult = "CPU wins the game!";
    } else {
      matchResult = "It's a tie game!";
    }
    window.alert(matchResult); 
  };

  const handleRefreshClick = () => {
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
            choice={playerChoice}
            setChoice={setPlayerChoice}
            availableChoices={playerChoices.filter(
              (choice) => !playerUsedChoices.includes(choice)
            )}
          />
        </div>
        <div className="button-container">
          <button className="rules-btn" onClick={handleShowModal}>
            Rules
          </button>
          {!matchEnded && (
            <button onClick={playGame} disabled={!playerChoice}>
              Play
            </button>
          )}
          {/* <button onClick={handleRefreshClick}>Refresh</button> */}
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
