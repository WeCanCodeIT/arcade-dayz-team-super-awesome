import React, { useState } from "react";
import Alien from "../components/Alien";
import Platform from "../components/Platform";
import Spaceship from "../components/Spaceship";
import "./AlienGame.css";

const initialPlatforms = [
  { id: 1, left: -700, top: 800, width: 100, height: 20, isMoving: false }, 
  { id: 2, left: -550, top: 730, width: 100, height: 20, isMoving: false }, 
  { id: 3, left: -400, top: 660, width: 100, height: 20, isMoving: false }, 
  { id: 4, left: -250, top: 590, width: 100, height: 20, isMoving: true, range: { start: -250, end: -50 }, speed: 2 }, 
  { id: 5, left: -100, top: 520, width: 100, height: 20, isMoving: false }, 
  { id: 6, left: 50, top: 450, width: 100, height: 20, isMoving: false }, 
  { id: 7, left: 200, top: 400, width: 100, height: 20, isMoving: false}, 
  { id: 8, left: 350, top: 350, width: 100, height: 20, isMoving: false }, 
  { id: 9, left: 425, top: 300, width: 100, height: 20, isMoving: false }, 
  { id: 10, left: 265, top: 250, width: 100, height: 20, isMoving: false } 
];


const spaceshipPosition = {
  left: 215, 
  top: 5, 
  width: 300, 
  height: 130 
};

const AlienGame = () => {
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [gameWon, setGameWon] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false); 

  const updatePlatformPosition = (id, newPosition) => {
    setPlatforms((prevPlatforms) =>
      prevPlatforms.map((platform) =>
        platform.id === id ? { ...platform, ...newPosition } : platform
      )
    );
  };

  const handleWin = () => {
    setGameWon(true);
    setTimeout(() => {
      setShowWinMessage(true);
    }, 1000); 
  };

  return (
    <div className="game-container">
      {showWinMessage && <div className="win-message">You win!</div>}
        <div className="alien-game">
          <Spaceship position={spaceshipPosition} />
          {!gameWon && (
            <Alien platforms={platforms} spaceshipPosition={spaceshipPosition} onWin={handleWin} />
          )}
          {platforms.map((platform) => (
            <Platform
              key={platform.id}
              position={{ left: platform.left, top: platform.top }}
              isMoving={platform.isMoving}
              range={platform.range}
              speed={platform.speed}
              updatePosition={(newPosition) =>
                updatePlatformPosition(platform.id, newPosition)
              }
            />
          ))}
        </div>
    </div>
  );
};

export default AlienGame;
