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
  const [hitMessage, setHitMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!isGameOver) {
      const interval = startNewInterval();
      setIntervalId(interval);
      return () => clearInterval(interval);
    }
  }, [isGameOver]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const startNewInterval = () => {
    return setInterval(() => {
      const newActiveHole = Math.floor(Math.random() * 7);
      const isMonster = Math.random() < 0.5;

      setActiveHole(newActiveHole);
      setActiveCharacter(isMonster ? "monster" : "mole");
    }, 1000);
  };

  const handleClick = () => {
    if (isGameOver) return;

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
            const newScore = prevScore > 10 ? prevScore - 10 : 0;
            if (newScore <= 0) {
              setIsGameOver(true);
              setHitMessage("YOU LOSE!");
            } else {
              setHitMessage("Don't smash the monsters!");
            }
            return newScore;
          });

          setHitMonster(activeHole);

          setTimeout(() => {
            setHitMessage("");
          }, 1000);
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

  const handleRestart = (e) => {
    e.stopPropagation();
    setScore(0);
    setHitMole(null);
    setHitMonster(null);
    setActiveHole(null);
    setActiveCharacter(null);
    setHitMessage("");
    setIsGameOver(false);
  };

  return (
    <div className="whac-a-mole" onClick={handleClick}>
      <div className="mole-title">
        <h1>Super Mole Smash!</h1>
      </div>
      <div className="holes">
        {[...Array(7)].map((_, index) => (
          <MoleHole
            key={index}
            index={index}
            isActive={index === activeHole}
            isHit={index === hitMole || index === hitMonster}
            activeCharacter={index === activeHole ? activeCharacter : null}
          />
        ))}
      </div>
      <img
        src="/mallet.png"
        alt="Hammer"
        className={`hammer ${isHammerDown ? "down" : ""}`}
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
      {hitMessage && (
        <div className="hit-message">
          {hitMessage}
        </div>
      )}
      {isGameOver && (
        <div className="game-over">
          <h2>{hitMessage}</h2>
        </div>
      )}
      {isGameOver && (
        <div className="play-again">
          <button onClick={handleRestart}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default WhacAMole;
