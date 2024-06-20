import React, { useState, useRef, useEffect } from "react";
import Alien from "../components/Alien";
import Platform from "../components/Platform";
import Spaceship from "../components/Spaceship";
import Fireball from "../components/Fireball";
import "./AlienGame.css";
import NavBar from "./NavBar";

const initialPlatforms = [
  { id: 1, left: 0, top: 800, width: 100, height: 20, isMoving: false }, 
  { id: 2, left: 150, top: 730, width: 100, height: 20, isMoving: false }, 
  { id: 3, left: 300, top: 660, width: 100, height: 20, isMoving: false }, 
  { id: 4, left: 450, top: 590, width: 100, height: 20, isMoving: true, range: { start: 450, end: 550 }, speed: 2 }, 
  { id: 5, left: 600, top: 520, width: 100, height: 20, isMoving: false }, 
  { id: 6, left: 750, top: 450, width: 100, height: 20, isMoving: false }, 
  { id: 7, left: 900, top: 400, width: 100, height: 20, isMoving: false }, 
  { id: 8, left: 1050, top: 350, width: 100, height: 20, isMoving: false }, 
  { id: 9, left: 1125, top: 300, width: 100, height: 20, isMoving: false }, 
  { id: 10, left: 965, top: 250, width: 100, height: 20, isMoving: false } 
];

const spaceshipPosition = {
  left: 700,
  top: 5,
  width: 300,
  height: 130
};

const AlienGame = () => {
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [gameWon, setGameWon] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState("HELP! The alien is lost and needs your help finding its way. Help it get back to its space shuttle. Avoid the fireballs AT ALL COSTS!!!");
  const [gameLost, setGameLost] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const gameAreaRef = useRef(null);
  const [gameArea, setGameArea] = useState({ width: 0, height: 0 });
  const [fireballs, setFireballs] = useState([]);
  const [playerPosition, setPlayerPosition] = useState({ left: 0, top: 0, width: 50, height: 50 });
  const [isGameStart, setIsGameStart] = useState(false);
  const MAX_FIREBALLS = 4;

  useEffect(() => {
    const updateGameArea = () => {
      if (gameAreaRef.current) {
        const { offsetWidth: width, offsetHeight: height } = gameAreaRef.current;
        setGameArea({ width, height });
      }
    };

    updateGameArea();
    window.addEventListener('resize', updateGameArea);

    return () => {
      window.removeEventListener('resize', updateGameArea);
    };
  }, []);

  useEffect(() => {
    if (isGameStart && gameArea.width && gameArea.height) { 
      const addFireball = () => {
        setFireballs((prevFireballs) => {
          if (prevFireballs.length < MAX_FIREBALLS) {
            return [
              ...prevFireballs,
              { id: Math.random(), top: 0, left: Math.random() * gameArea.width, width: 50, height: 50 }
            ];
          }
          return prevFireballs;
        });
      };

      const interval = setInterval(addFireball, 5000); 
      return () => clearInterval(interval);
    }
  }, [isGameStart, gameArea]);

  const updatePlatformPosition = (id, newPosition) => {
    setPlatforms((prevPlatforms) =>
      prevPlatforms.map((platform) =>
        platform.id === id ? { ...platform, ...newPosition } : platform
      )
    );
  };

  const handleWin = () => {
    setGameWon(true);
    setShowWinMessage("You helped the alien find their way home! YOU WIN!");
    setButtonText("Play Again");
  };

  const handleStart = () => {
    setIsGameStart(true);
    setGameLost(false);
    setGameWon(false);
    setFireballs([]);
    setButtonText("Start");
    setShowWinMessage("");
  };

  const handleHit = () => {
    setGameLost(true);
    setShowWinMessage("Game Over! The alien was hit!");
    setButtonText("Play Again");
  };

  const handleFall = () => {
    setGameLost(true);
    setShowWinMessage("The alien fell. YOU LOSE!");
    setButtonText("Play Again");
  };

  const updatePlayerPosition = (newPosition) => {
    setPlayerPosition(newPosition);
  };

  return (
    <div className="game-container" ref={gameAreaRef}>
      {showWinMessage && <div className="win-message">{showWinMessage}</div>}
      <div className="alien-game">
        <Spaceship position={spaceshipPosition} />
        {isGameStart && !gameWon && !gameLost && (
          <Alien
            platforms={platforms}
            spaceshipPosition={spaceshipPosition}
            fireballs={fireballs}
            onWin={handleWin}
            onHit={handleHit}
            onLose={handleFall}
            updatePlayerPosition={updatePlayerPosition}
            gameArea={gameArea}
          />
        )}
        {isGameStart && platforms.map((platform) => (
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
        {isGameStart && fireballs.map((fireball) => (
          <Fireball key={fireball.id} position={fireball} gameArea={gameArea} playerPosition={playerPosition} onHit={handleHit} />
        ))}
        {!isGameStart && <button className="start-button" onClick={handleStart}>{buttonText}</button>}
        {(gameLost || gameWon) && <button className="start-button" onClick={handleStart}>{buttonText}</button>}
      </div>
      <NavBar />
    </div>
  );
};

export default AlienGame;
