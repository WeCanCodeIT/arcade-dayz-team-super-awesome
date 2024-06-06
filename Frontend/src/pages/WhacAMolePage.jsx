import React, { useState, useEffect } from "react";
import MoleHole from "../components/MoleHole";
import WhacAMoleScoreBadge from "../components/WhacAMoleScoreBadge";
import "./WhacAMole.css";

const WhacAMole = ({ score, setScore }) => {
  const [activeHole, setActiveHole] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHammerDown, setIsHammerDown] = useState(false);
  const [hitMole, setHitMole] = useState(null);
  const [hitMonster, setHitMonster] = useState(null);
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [hitMessage, setHitMessage] = useState("Welcome to Super Mole Smash! Hit the moles, not the monsters... or else.");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);

  useEffect(() => {
    if (isGameStart && !isGameOver) {
      const interval = startNewInterval();
      setIntervalId(interval);
      return () => clearInterval(interval); 
    }
  }, [isGameStart, isGameOver]); 

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    return () => clearInterval(intervalId);  
  }, []);

  const startNewInterval = () => {
    clearInterval(intervalId); 
    return setInterval(() => {
      const newActiveHole = Math.floor(Math.random() * 7);
      const isMonster = Math.random() < 0.5;

      setActiveHole(newActiveHole);
      setActiveCharacter(isMonster ? "monster" : "mole");
    }, 1000);
  };

  const handleClick = () => {
    if (!isGameStart || isGameOver) return; 

    setIsHammerDown(true);
    setTimeout(() => setIsHammerDown(false), 200);

    const hammerRadius = 25;
    const characterRadius = 40;
    const hammerCenterX = mousePosition.x;
    const hammerCenterY = mousePosition.y;

    const activeHoleElement = document.querySelector(`.hole-${activeHole}`);
    if (activeHoleElement) {
      const characterRect = activeHoleElement.getBoundingClientRect();
      const characterCenterX = characterRect.left + characterRect.width / 2;
      const characterCenterY = characterRect.top + characterRect.height / 2;

      const distance = Math.sqrt(
        (hammerCenterX - characterCenterX) ** 2 +
          (hammerCenterY - characterCenterY) ** 2
      );

      if (distance < hammerRadius + characterRadius) {
        clearInterval(intervalId);
        if (activeCharacter === "mole") {
          setScore((prevScore) => prevScore + 1);
          setHitMole(activeHole);
        } else if (activeCharacter === "monster") {
          setScore((prevScore) => {
            const newScore = prevScore > 2 ? prevScore - 2 : 0;
            if (newScore <= 0) {
              setIsGameOver(true);
              setHitMessage("YOU LOSE!");
            } else {
              setHitMessage("Don't smash the monsters!");
              setTimeout(() => setHitMessage(""), 1000);
            }
            return newScore;
          });
          setHitMonster(activeHole);
        }

        setTimeout(() => {
          setHitMole(null);
          setHitMonster(null);
          setActiveHole(null);
          setActiveCharacter(null);

          if (!isGameOver) {
            const newInterval = startNewInterval();
            setIntervalId(newInterval);
          }
        }, 500);
      }
    }
  };

  const handleStart = () => {
    setIsGameStart(true);
    setIsGameOver(false);
    setScore(0);
    setHitMole(null);
    setHitMonster(null);
    setActiveHole(null);
    setActiveCharacter(null);
    setHitMessage("");
    const newInterval = startNewInterval();
    setIntervalId(newInterval);
  };

  const handleRestart = (e) => {
    e.stopPropagation();
    clearInterval(intervalId);
    setIsGameStart(true); 
    setScore(0);
    setHitMole(null);
    setHitMonster(null);
    setActiveHole(null);
    setActiveCharacter(null);
    setHitMessage("");
    const newInterval = startNewInterval();
    setIntervalId(newInterval);
    setIsGameOver(false);
  };

  return (
   
    <div
      className={`whac-a-mole ${isGameOver ? "game-over" : ""} ${isGameStart && !isGameOver ? "hide-cursor" : ""}`}
      onClick={handleClick}
    >
      <div className="mole-title">
        <h1>Super Mole Smash!</h1>
      </div>
      <div className="holes">
        {[...Array(7)].map((_, index) => (
          <MoleHole
            key={index}
            index={index}
            isActive={isGameStart && !isGameOver && index === activeHole} 
            isHit={index === hitMole || index === hitMonster}
            activeCharacter={
              isGameStart && !isGameOver && index === activeHole ? activeCharacter : null
            }
            isGameOver={isGameOver}
          />
        ))}
      </div>
      {!isGameOver && isGameStart && (
        <img
          src="/mallet.png"
          alt="Hammer"
          className={`hammer ${isHammerDown ? "down" : ""}`}
          style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
        />
      )}
      {isGameStart && !isGameOver && <WhacAMoleScoreBadge score={score} /> }
      {hitMessage && <div className="hit-message">{hitMessage}</div>}
      {!isGameStart && (
        <div className="start-game">
          <button onClick={handleStart}>Play</button>
        </div>
      )}
      {isGameOver && (
        <>
          <div className="game-over-message"></div>
          <div className="play-again">
            <button onClick={handleRestart}>Play Again</button>
          </div>
        </>
      )}
    </div>
    );
};

export default WhacAMole;
