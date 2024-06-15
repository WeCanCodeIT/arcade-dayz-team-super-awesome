import React from "react";
import { Link } from "react-router-dom";
import "../pages/HomePageStyle.css";
import NavBar from "../pages/NavBar";
import "../components/NavBar.css";

function HomePage() {

  return (

      <div className="home-container">
        <h1>Arcade Dayz</h1>
        <div className="home-links-container">
          <Link to="/tic-tac-toe" className="home-link">Tic Tac Toe</Link>
          <Link to="/PongGame" className="home-link">Pong</Link>
          <Link to="/RPSJokerAce" className="home-link">Rock Paper Scissors Joker Ace</Link>
          <Link to="/mole-smash" className="home-link">Super Mole Smash</Link>
          <Link to="/DiceGame" className="home-link">Dice Game</Link>
          <Link to="/connect-four" className="home-link">Connect Four</Link>
          <Link to="/alien-jump" className="home-link">Alien Jump</Link>
        </div>
      </div>

   
   
  );
}

export default HomePage;
