import React, { useState, useEffect } from 'react';
import './Alien.css';

const GRAVITY = 0.5;
const JUMP_STRENGTH = -12;
const PLAYER_HEIGHT = 50;
const PLAYER_WIDTH = 50;
const COLLISION_OFFSET = 12;
const FALL_OFFSET = 200; // Adjust this value to ensure the alien drops lower before triggering the fall

const Alien = ({ platforms, spaceshipPosition, onWin, onLose, fireballs, updatePlayerPosition, gameArea, isGameStart }) => {
  const [position, setPosition] = useState({ left: platforms[0].left, top: platforms[0].top - PLAYER_HEIGHT });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [onPlatform, setOnPlatform] = useState(null);
  const [gameOver, setGameOver] = useState(false); // Track game over state

  useEffect(() => {
    if (isGameStart) {
      setPosition({ left: platforms[0].left, top: platforms[0].top - PLAYER_HEIGHT });
      setVelocity({ x: 0, y: 0 });
      setIsJumping(false);
      setOnPlatform(null);
      setGameOver(false); // Reset game over state on game start
    }
  }, [isGameStart, platforms]);

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

  const checkFireballCollision = (pos) => {
    if (!Array.isArray(fireballs)) return false;
    
    for (let i = 0; i < fireballs.length; i++) {
      const fireball = fireballs[i];
      const fireballLeft = fireball.left;
      const fireballRight = fireball.left + 50;
      const fireballTop = fireball.top;
      const fireballBottom = fireball.top + 50;

      if (
        pos.left + PLAYER_WIDTH > fireballLeft &&
        pos.left < fireballRight &&
        pos.top + PLAYER_HEIGHT > fireballTop &&
        pos.top < fireballBottom
      ) {
        return true;
      }
    }

    return false;
  };

  const checkSpaceshipCollision = (pos) => {
    const offset = -45;
    const offsetBottom = -38;
    const spaceshipLeft = spaceshipPosition.left + offset;
    const spaceshipRight = spaceshipPosition.left + spaceshipPosition.width - offset;
    const spaceshipBottom = spaceshipPosition.top + spaceshipPosition.height + offsetBottom;

    if (
      pos.left + PLAYER_WIDTH / 2 > spaceshipLeft && 
      pos.left + PLAYER_WIDTH / 2 < spaceshipRight &&
      pos.top + PLAYER_HEIGHT >= spaceshipBottom &&
      pos.top <= spaceshipBottom + 10 
    ) {
      return true;
    }
    return false;
  };

  const isBelowLowestPlatform = (pos) => {
    const lowestPlatform = platforms.reduce((lowest, platform) => {
      return platform.top > lowest.top ? platform : lowest;
    }, platforms[1]); // Initialize with the second platform in the list
    const alienTop = pos.top;
    const platformBottom = lowestPlatform.top + lowestPlatform.height;
    const result = alienTop > platformBottom + FALL_OFFSET; // Adjusted with FALL_OFFSET
    console.log(`Checking fall: Alien Top = ${alienTop}, Platform Bottom = ${platformBottom}, Result = ${result}`);
    return result;
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
          if (!gameOver) {
            setGameOver(true);
            onWin();
          }
          return prev;
        }

        const fireballCollision = checkFireballCollision({ left: newLeft, top: newTop });
        if (fireballCollision) {
          if (!gameOver) {
            setGameOver(true);
            onLose();
          }
          return prev;
        }

        if (isBelowLowestPlatform({ left: newLeft, top: newTop })) {
          if (!gameOver) {
            console.log("Triggering fall due to being below the lowest platform");
            setGameOver(true);
            onLose();
          }
          return prev;
        }

        if (newTop > gameArea.height) {
          if (!gameOver) {
            console.log(`Triggering fall due to exceeding game area height: Alien Top = ${newTop}, Game Area Height = ${gameArea.height}`);
            setGameOver(true);
            onLose();
          }
          return prev;
        }

        const newPosition = { left: newLeft, top: newTop, width: PLAYER_WIDTH, height: PLAYER_HEIGHT };
        updatePlayerPosition(newPosition);
        return newPosition;
      });
    }, 20);

    return () => clearInterval(gameLoop);
  }, [velocity, platforms, spaceshipPosition, fireballs, gameArea, onWin, onLose, updatePlayerPosition, gameOver]);

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
