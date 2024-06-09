import React from "react";
import { Link } from "react-router-dom";
import "../pages/";


function HomePage() {
  return (
    <div className="home-page">
      <div className="home-container">
        <h1>Arcade Dayz</h1>
        <div className="links-container">
          <Link to="/tic-tac-toe" className="styled-link">Tic Tac Toe</Link>
          <Link to="/PongGame" className="styled-link">Pong</Link>
          <Link to="/RPSJokerAce" className="styled-link">Rock Paper Scissors Joker Ace</Link>
          <Link to="/mole-smash" className="styled-link">Super Mole Smash</Link>
          <Link to="/DiceGame" className="styled-link">Pong</Link>
          <Link to="/connect-four" className="styled-link">Connect Four</Link>
          <Link to="/alien-jump" className="styled-link">Alien Jump</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
