import React, { useState, useEffect } from "react";
import "../Fireball.css";

const Fireball = ({ position, onHit, gameArea }) => {
  const [currentPosition, setCurrentPosition] = useState(position);

  useEffect(() => {
    if(!gameArea.height) return;
    
    const interval = setInterval(() => {
      setCurrentPosition((prevPosition) => {
        const newTop = prevPosition.top + 15;
        if (newTop > gameArea.height) {
          const newPosition = { top: 0, left: Math.random() * gameArea.width };
          return newPosition;
        }
        return { ...prevPosition, top: newTop };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameArea]);

  useEffect(() => {
    // Collision detection logic here
    // If collision is detected, call onHit
  }, [currentPosition, onHit]);

  return <img className="fireball" src="/alien-images/fireball.png" style={{ top: currentPosition.top, left: currentPosition.left, position: 'absolute' }} alt="Fireball" />;
};

export default Fireball;
