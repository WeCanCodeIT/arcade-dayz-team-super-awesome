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
      <GameCanvas updateScore={updateScore} />
      <div className="player-names">
        <Header leftScore={score.player1} rightScore={score.player2} />
      </div>
    </div>
  );
};

export default PongGamePage;
