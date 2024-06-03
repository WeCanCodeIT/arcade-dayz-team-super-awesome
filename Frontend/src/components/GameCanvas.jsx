import React, { useEffect, useRef, useState } from 'react';
import '../pages/pong-game.css';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [paddle1Y, setPaddle1Y] = useState(150);
  const [paddle2Y, setPaddle2Y] = useState(150);
  const [ball, setBall] = useState({ x: 250, y: 200, radius: 10, dx: 2, dy: 2 });
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [gameRunning, setGameRunning] = useState(false); 

  const resetBall = () => {
    setBall({ x: 250, y: 200, radius: 10, dx: 2, dy: 2 });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const keyPressHandler = (event) => {
      const paddleSpeed = 20;
      if (event.key === 'w') {
        setPaddle1Y(prevY => Math.max(prevY - paddleSpeed, 40));
      }
      if (event.key === 's') {
        setPaddle1Y(prevY => Math.min(prevY + paddleSpeed, canvas.height - 100));
      }
      if (event.key === 'ArrowUp') {
        setPaddle2Y(prevY => Math.max(prevY - paddleSpeed, 40));
      }
      if (event.key === 'ArrowDown') {
        setPaddle2Y(prevY => Math.min(prevY + paddleSpeed, canvas.height - 100));
      }
    };

    window.addEventListener('keydown', keyPressHandler);

    const updateBall = () => {
      setBall(prevBall => {
        let { x, y, dx, dy } = prevBall;

        if (y + dy < 0 || y + dy > canvas.height) dy = -dy;

        if (x + dx < 0) {
          setScore(prevScore => ({ ...prevScore, player2: prevScore.player2 + 1 }));
          resetBall();
        }
        if (x + dx > canvas.width) {
          setScore(prevScore => ({ ...prevScore, player1: prevScore.player1 + 1 }));
          resetBall();
        }

        if (x + dx < 30 && y > paddle1Y && y < paddle1Y + 100) dx = -dx;
        if (x + dx > canvas.width - 30 && y > paddle2Y && y < paddle2Y + 100) dx = -dx;

        return { ...prevBall, x: x + dx, y: y + dy, dx, dy };
      });
    };


    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'rgba(0, 0, 0, 0.7)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.strokeStyle = 'blue';
      context.lineWidth = 5;
      context.strokeRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = 'white';
      context.fillRect(20, paddle1Y, 10, 100);
      context.fillRect(canvas.width - 30, paddle2Y, 10, 100);

      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
      context.fill();
    };

    const gameLoop = () => {
      if (gameRunning) { 
        updateBall();
        draw();
        requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [paddle1Y, paddle2Y, ball, gameRunning]); 

  const startGame = () => {
    setGameRunning(true); 
  };

  const resetGame = () => {
    setScore({ player1: 0, player2: 0 });
    resetBall();
    setGameRunning(false);
  };

  return (
    <div className="pong-game-page">
      <div className="pong-game-background"></div>
      <h1 className="title">Pong Game</h1>
      <canvas ref={canvasRef} width={500} height={400} className="game-canvas" />
      <div className="status">
        <p>Player 1: {score.player1}</p>
        <p>Player 2: {score.player2}</p>
        {!gameRunning && <button onClick={startGame}>Start</button>} 
        <button onClick={resetGame}>Reset</button> 
      </div> 
    </div> 
  );
};

export default GameCanvas;
