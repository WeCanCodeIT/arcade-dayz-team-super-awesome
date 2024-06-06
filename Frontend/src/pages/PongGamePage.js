import React, { useState } from "react";
import "./pong-game.css";
import Header from "../components/PongHeader";
import GameCanvas from "../components/GameCanvas";

const PongGamePage = () => {
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  return (
    <div className="pong-game-page">
      <h1 className="title">Welcome to the Pong Game</h1>
       <Header leftScore={score.player1} rightScore={score.player2} />       <GameCanvas updateScore={updateScore} />
    </div>
  );
};

export default PongGamePage;
