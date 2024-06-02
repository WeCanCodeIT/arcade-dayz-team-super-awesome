import React, { useEffect, useRef, useState } from 'react';
import Paddle from './Paddle';
import PongBall from './PongBall';

const GameCanvas = () => {
  const canvasRef = useRef();
  const [paddle1Y, setPaddle1Y] = useState(150);
  const [paddle2Y, setPaddle2Y] = useState(150);
  const [ball, setBall] = useState({ x: 250, y: 200, radius: 10, dx: 2, dy: 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const keyPressHandler = (event) => {
      const paddleSpeed = 20;
      if (event.key === 'w') {
        setPaddle1Y(prevY => Math.max(prevY - paddleSpeed, 0));
      }
      if (event.key === 's') {
        setPaddle1Y(prevY => Math.min(prevY + paddleSpeed, canvas.height - 100));
      }
      if (event.key === 'ArrowUp') {
        setPaddle2Y(prevY => Math.max(prevY - paddleSpeed, 0));
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

    
        if (x + dx < 30 && y > paddle1Y && y < paddle1Y + 100) dx = -dx;
        if (x + dx > canvas.width - 30 && y > paddle2Y && y < paddle2Y + 100) dx = -dx;

        return { ...prevBall, x: x + dx, y: y + dy, dx, dy };
      });
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'black';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = 'white';
      context.fillRect(20, paddle1Y, 10, 100);
      context.fillRect(canvas.width - 30, paddle2Y, 10, 100);

      
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
      context.fill();
    };

    const gameLoop = () => {
      updateBall();
      draw();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [paddle1Y, paddle2Y, ball]);

  return <canvas ref={canvasRef} width={500} height={400} />;
};

export default GameCanvas;
