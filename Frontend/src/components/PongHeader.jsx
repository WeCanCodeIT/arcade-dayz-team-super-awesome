import React from "react";
import "../pages/pong-game.css";

const Header = ({ leftScore, rightScore }) => {
  return (
    <div className="header">
       <div className="score">
        Player 1: <div className="bubble">{leftScore}</div>
      </div>
      <div className="score">
        Player 2: <div className="bubble">{rightScore}</div>
      </div> 
    </div>
  );
};

export default Header;
