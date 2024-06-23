import React, { useState } from "react";
import "./pong-game.css";
import GameCanvas from "../components/GameCanvas";
import Navbar from "./NavBar";

const PongGamePage = () => {
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  return (
    <div className="pong-game-page">
      <div className="pong-header">
        <h1 className="pong-title">Welcome to the Pong Game</h1>
      <div className="pong-player-info">
        <div className="pong-player-score">
          Player 1: <span>{score.player1}</span>
        </div>
        <div className="pong-player-score">
          Player 2: <span>{score.player2}</span>
        </div>
        <div className="pong-game-container">
        </div>
      </div>
      </div>
      <div className="pong-game-border">
        <GameCanvas updateScore={updateScore} />
      </div>
      <Navbar />
    </div>
  );
};

export default PongGamePage;
