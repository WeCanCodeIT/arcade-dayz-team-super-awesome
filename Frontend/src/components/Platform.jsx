import React, { useState, useEffect, useRef } from "react";
import "./Platform.css";

const Platform = ({
  position,
  isMoving = false,
  range = { start: 0, end: 100 },
  speed = 1,
  updatePosition,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position.left);
  const [direction, setDirection] = useState(1);
  const movePlatformRef = useRef();

  useEffect(() => {
    if (isMoving) {
      const movePlatform = () => {
        setCurrentPosition((prev) => {
          let newPos = prev + direction * speed;
          if (newPos > range.end || newPos < range.start) {
            setDirection((dir) => -dir);
            newPos = prev + direction * speed;
          }

          updatePosition({ left: newPos, top: position.top });
          return newPos;
        });
      };

      movePlatformRef.current = setInterval(movePlatform, 20);

      return () => clearInterval(movePlatformRef.current);
    }
  }, [isMoving, direction, range, speed, updatePosition, position.top]);

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
