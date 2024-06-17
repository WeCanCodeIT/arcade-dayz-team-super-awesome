import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pages/HomePageStyle.css";
import "../components/NavBar.css";
import ticcard from "../components/HomeCards/ticcard.jpeg";
import pong from "../components/HomeCards/pong.jpeg";
import rps from "../components/HomeCards/RPS.jpeg";
import mole from "../components/HomeCards/mole.jpeg";
import dice from "../components/HomeCards/dice0.jpeg";
import connect from "../components/HomeCards/connect.jpeg";
import alien from "../components/HomeCards/alien.jpeg";

function HomePage() {
  const [startIndex, setStartIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredGame] = useState({ to: "/PongGame", text: "Pong", image: pong }); // Example featured game

  const links = [
    { to: "/tic-tac-toe", text: "Tic Tac Toe", image: ticcard },
    { to: "/PongGame", text: "Pong", image: pong },
    { to: "/RPSJokerAce", text: "Rock Paper Scissors Joker Ace", image: rps },
    { to: "/mole-smash", text: "Super Mole Smash", image: mole },
    { to: "/DiceGame", text: "Dice Game", image: dice },
    { to: "/connect-four", text: "Connect Four", image: connect },
    { to: "/alien-jump", text: "Alien Jump", image: alien },
  ];

  const itemsPerPage = 3;

  const nextSet = () => {
    const nextIndex = (startIndex + 1) % links.length;
    setStartIndex(nextIndex);
  };

  const prevSet = () => {
    const prevIndex = (startIndex - 1 + links.length) % links.length;
    setStartIndex(prevIndex);
  };

  useEffect(() => {
    if (startIndex > links.length - itemsPerPage) {
      setStartIndex(links.length - itemsPerPage);
    }
  }, [startIndex, links.length]);

  const continueNext = () => {
    if (startIndex === links.length - itemsPerPage) {
      setStartIndex(0);
    } else {
      nextSet();
    }
  };



  const filteredLinks = links.filter((link) =>
    link.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      

      <div className="carousel-container">
        <button className="carousel-control prev" onClick={prevSet}>
          &lt;
        </button>
        <div className="carousel-slide">
          {[0, 1, 2].map((offset) => {
            const index = (startIndex + offset) % filteredLinks.length; 
            const link = filteredLinks[index];
            return (
              <div key={link.to} className="card-container">
                <Link to={link.to} className="card-link">
                  <div className="card">
                    <img src={link.image} alt={link.text} className="card-image" />
                    <div className="card-content">
                      <span>{link.text}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <button className="carousel-control next" onClick={continueNext}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default HomePage;
