import React, { useState, useEffect } from 'react';
import './Alien.css';

const GRAVITY = 0.5;
const JUMP_STRENGTH = -15;
const PLAYER_HEIGHT = 50;
const PLAYER_WIDTH = 50;
const COLLISION_OFFSET = 12;

const Alien = ({ platforms, spaceshipPosition, onWin }) => {
  const [position, setPosition] = useState({ left: platforms[0].left, top: platforms[0].top - PLAYER_HEIGHT });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [onPlatform, setOnPlatform] = useState(null);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setVelocity((prev) => ({ ...prev, x: -5 }));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setVelocity((prev) => ({ ...prev, x: 5 }));
        break;
      case 'ArrowUp':
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
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setVelocity((prev) => ({ ...prev, x: 0 }));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping]);

  const checkPlatformCollision = (pos) => {
    for (let platform of platforms) {
      const platformLeft = platform.left;
      const platformRight = platform.left + platform.width;
      if (
        pos.left + PLAYER_WIDTH > platformLeft &&
        pos.left < platformRight &&
        pos.top + PLAYER_HEIGHT + COLLISION_OFFSET >= platform.top &&
        pos.top + PLAYER_HEIGHT + COLLISION_OFFSET <= platform.top + platform.height
      ) {
        return platform;
      }
    }
    return null;
  };

  const checkSpaceshipCollision = (pos) => {
    const spaceshipLeft = spaceshipPosition.left;
    const spaceshipRight = spaceshipPosition.left + spaceshipPosition.width;
    const spaceshipBottom = spaceshipPosition.top + spaceshipPosition.height;

    if (
      pos.left + PLAYER_WIDTH / 2 > spaceshipLeft + spaceshipPosition.width / 4 && 
      pos.left + PLAYER_WIDTH / 2 < spaceshipRight - spaceshipPosition.width / 4 &&
      pos.top + PLAYER_HEIGHT >= spaceshipBottom &&
      pos.top <= spaceshipBottom + 10 
    ) {
      return true;
    }
    return false;
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

        if (platformCollision && velocity.y >= 0) {
          newTop = platformCollision.top - PLAYER_HEIGHT - COLLISION_OFFSET;
          setVelocity((prevVelocity) => ({ ...prevVelocity, y: 0 }));
          setIsJumping(false);
          setOnPlatform(platformCollision);
        } else {
          setVelocity((prevVelocity) => ({
            ...prevVelocity,
            y: prevVelocity.y + GRAVITY,
          }));
          setOnPlatform(null);
        }

        const spaceshipCollision = checkSpaceshipCollision({ left: newLeft, top: newTop });
        if (spaceshipCollision) {
          onWin();
          return prev;
        }

        return { left: newLeft, top: newTop };
      });
    }, 20);

    return () => clearInterval(gameLoop);
  }, [velocity, platforms, spaceshipPosition, onWin]);

  useEffect(() => {
    if (onPlatform && onPlatform.isMoving) {
      const moveWithPlatform = setInterval(() => {
        setPosition((prev) => ({
          ...prev,
          left: prev.left + (onPlatform.left - prev.left),
        }));
      }, 20);

      return () => clearInterval(moveWithPlatform);
    }
  }, [onPlatform]);

  return (
    <div className="player" style={{ left: position.left, top: position.top }}>
      <img src="/alien-images/alien.png" alt="Alien" />
    </div>
  );
};

export default Alien;
