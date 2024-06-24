import React, { useState, useEffect } from "react";
import "./Alien.css";

const GRAVITY = 0.5;
const JUMP_STRENGTH = -12;
const PLAYER_HEIGHT = 50;
const PLAYER_WIDTH = 50;
const COLLISION_OFFSET = 12;

const Alien = ({
  platforms,
  spaceshipPosition,
  onWin,
  onFall,
  onHit,
  fireballs,
  updatePlayerPosition,
  gameArea,
  isGameOver,
}) => {
  const [position, setPosition] = useState({
    left: platforms[0].left,
    top: platforms[0].top - PLAYER_HEIGHT,
  });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [onPlatform, setOnPlatform] = useState(null);

  const handleKeyDown = (e) => {
    if (isGameOver) return; 
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
  }, [isGameOver]);

  const checkPlatformCollision = (pos) => {
    for (let platform of platforms) {
      const platformLeft = platform.left;
      const platformRight = platform.left + platform.width;
      const platformTop = platform.top;
      const platformBottom = platform.top + platform.height;

      if (
        pos.left + PLAYER_WIDTH > platformLeft &&
        pos.left < platformRight &&
        pos.top + PLAYER_HEIGHT + COLLISION_OFFSET >= platformTop &&
        pos.top + PLAYER_HEIGHT + COLLISION_OFFSET <= platformBottom
      ) {
        return platform;
      }
    }
    return null;
  };

  const checkFireballCollision = (pos) => {
    if (!Array.isArray(fireballs)) return false;

    for (let fireball of fireballs) {
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
    const spaceshipRight =
      spaceshipPosition.left + spaceshipPosition.width - offset;
    const spaceshipBottom =
      spaceshipPosition.top + spaceshipPosition.height + offsetBottom;

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

  useEffect(() => {
    if (isGameOver) return;

    const gameLoop = setInterval(() => {
      setPosition((prev) => {
        let newTop = prev.top + velocity.y;
        let newLeft = prev.left + velocity.x;

        console.log(`Player Position Before Update - Left: ${prev.left}, Top: ${prev.top}`);
        console.log(`Player Position After Update - Left: ${newLeft}, Top: ${newTop}`);
        console.log(`Game Area Height: ${gameArea.height}`);

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

        const spaceshipCollision = checkSpaceshipCollision({
          left: newLeft,
          top: newTop,
        });
        if (spaceshipCollision) {
          onWin();
          return prev;
        }

        const fireballCollision = checkFireballCollision({
          left: newLeft,
          top: newTop,
        });
        if (fireballCollision) {
          console.log("Collision with fireball detected");
          onHit();
          return prev;
        }

        if (newTop + PLAYER_HEIGHT + COLLISION_OFFSET > gameArea.height) {
          console.log("Player has fallen below the game area");
          onFall();
          return prev;
        }

        const newPosition = {
          left: newLeft,
          top: newTop,
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
        };
        updatePlayerPosition(newPosition);
        return newPosition;
      });
    }, 20);

    return () => clearInterval(gameLoop);
  }, [
    velocity,
    platforms,
    spaceshipPosition,
    fireballs,
    gameArea,
    onWin,
    onHit,
    onFall,
    updatePlayerPosition,
    isGameOver,
  ]);

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
