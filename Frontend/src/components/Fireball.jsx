import React, { useState, useEffect, useRef } from "react";
import "../Fireball.css";

const Fireball = ({ position, onHit, gameArea, playerPosition }) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const moveFireballRef = useRef();

  useEffect(() => {
    if (!gameArea.height) return;

    const moveFireball = () => {
      setCurrentPosition((prevPosition) => {
        const newTop = prevPosition.top + 15;
        if (newTop > gameArea.height) {
          const newPosition = { top: 0, left: Math.random() * gameArea.width };
          return newPosition;
        }
        return { ...prevPosition, top: newTop };
      });
    };

    moveFireballRef.current = setInterval(moveFireball, 100);

    return () => clearInterval(moveFireballRef.current);
  }, [gameArea]);

  useEffect(() => {
    const detectCollision = () => {
      const fireballLeft = currentPosition.left;
      const fireballRight = currentPosition.left + 50;
      const fireballTop = currentPosition.top;
      const fireballBottom = currentPosition.top + 50;

      const playerLeft = playerPosition.left;
      const playerRight = playerPosition.left + playerPosition.width;
      const playerTop = playerPosition.top;
      const playerBottom = playerPosition.top + playerPosition.height;

      if (
        fireballLeft < playerRight &&
        fireballRight > playerLeft &&
        fireballTop < playerBottom &&
        fireballBottom > playerTop
      ) {
        onHit();
      }
    };

    detectCollision();
  }, [currentPosition, playerPosition, onHit]);

  return (
    <img
      className="fireball"
      src="/alien-images/fireball.png"
      style={{ top: currentPosition.top, left: currentPosition.left, position: 'absolute' }}
      alt="Fireball"
    />
  );
};

export default Fireball;
