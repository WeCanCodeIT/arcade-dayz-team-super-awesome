import React, { useState, useEffect } from "react";
import "./Alien.css";

const GRAVITY = 0.5;
const JUMP_STRENGTH = -15;
const PLAYER_HEIGHT = 50;
const PLAYER_WIDTH = 50;
const COLLISION_OFFSET = 21;

const Alien = ({ platforms }) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        setVelocity((prev) => ({ ...prev, x: -5 }));
        break;
      case "ArrowRight":
        e.preventDefault();
        setVelocity((prev) => ({ ...prev, x: 5 }));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isJumping) {
          setVelocity((prev) => ({ ...prev, y: JUMP_STRENGTH }));
          setIsJumping(true);
        }
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setVelocity((prev) => ({ ...prev, x: 0 }));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isJumping]);

  const checkPlatformCollision = (pos) => {
    for (let platform of platforms) {
      if (
        pos.left + PLAYER_WIDTH > platform.left &&
        pos.left < platform.left + platform.width &&
        pos.top + PLAYER_HEIGHT + COLLISION_OFFSET >= platform.top &&
        pos.top + PLAYER_HEIGHT + COLLISION_OFFSET <=
          platform.top + platform.height
      ) {
        return platform.top - PLAYER_HEIGHT - COLLISION_OFFSET;
      }
    }
    return null;
  };

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setPosition((prev) => {
        let newTop = prev.top + velocity.y;
        let newLeft = prev.left + velocity.x;

        const platformCollision = checkPlatformCollision({
          left: newLeft,
          top: newTop,
        });

        if (platformCollision !== null && velocity.y >= 0) {
          newTop = platformCollision;
          setVelocity((prevVelocity) => ({ ...prevVelocity, y: 0 }));
          setIsJumping(false);
        } else {
          setVelocity((prevVelocity) => ({
            ...prevVelocity,
            y: prevVelocity.y + GRAVITY,
          }));
        }

        return { left: newLeft, top: newTop };
      });
    }, 20);

    return () => clearInterval(gameLoop);
  }, [velocity, platforms]);

  return (
    <div className="player" style={{ left: position.left, top: position.top }}>
      <img src="./alien-images/alien.png" alt="Alien" />
    </div>
  );
};

export default Alien;
