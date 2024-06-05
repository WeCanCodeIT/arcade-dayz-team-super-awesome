import React from "react";
import "../pages/pong-game.css";

const Header = ({ leftScore, rightScore }) => {
  return (
    <div className="header">
      <div className="score">
        Player 1: <div className="pink-bubble">{leftScore}</div>
      </div>
      <div className="score">
        Player 2: <div className="pink-bubble">{rightScore}</div>
      </div>
    </div>
  );
};

export default Header;
