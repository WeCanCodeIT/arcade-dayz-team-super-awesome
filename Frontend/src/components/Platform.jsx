import React, { useState, useEffect } from "react";
import "./Platform.css";

const Platform = ({
  position,
  isMoving = false,
  range = { start: 0, end: 100 },
  speed = 1,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position.left);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (isMoving) {
      const movePlatform = setInterval(() => {
        setCurrentPosition((prev) => {
          let newPos = prev + direction * speed;
          if (newPos > range.end || newPos < range.start) {
            setDirection(-direction);
            newPos = prev;
          }
          return newPos;
        });
      }, 20);

      return () => clearInterval(movePlatform);
    }
  }, [isMoving, direction, range, speed]);

  return (
    <div
      className="platform"
      style={{ left: `${currentPosition}px`, top: `${position.top}px` }}
    >
      <img src="/alien-images/wood-plank.png" alt="Platform" />
    </div>
  );
};

export default Platform;
