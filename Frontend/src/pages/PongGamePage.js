import React, { useState } from "react";
import "./pong-game.css";
import Header from "../components/PongHeader";
import GameCanvas from "../components/GameCanvas";
import Navbar from "./NavBar";

const PongGamePage = () => {
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  return (
    <div className="pong-game-page">
      <div className="game-container">
        <h1 className="title">Welcome to the Pong Game</h1>
        <div className="player-info"></div>
        <div className="game-border">
          <GameCanvas updateScore={updateScore} />
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default PongGamePage;
