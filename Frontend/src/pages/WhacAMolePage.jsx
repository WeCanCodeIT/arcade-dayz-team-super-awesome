
import React, { useState, useEffect } from 'react';
import MoleHole from '../components/MoleHole';
import './WhacAMole.css';

const WhacAMole = () => {
  const [activeHole, setActiveHole] = useState(null);
  const [score, setScore] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHammerDown, setIsHammerDown] = useState(false);
  const [hitMole, setHitMole] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActiveHole = Math.floor(Math.random() * 7);
      setActiveHole(newActiveHole);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  const handleClick = () => {
    setIsHammerDown(true);
    setTimeout(() => setIsHammerDown(false), 200); // Hammer down animation for 200ms

    const hammerRadius = 25; // Adjust based on hammer image size
    const moleRadius = 40; // Adjust based on mole size and margin
    const hammerCenterX = mousePosition.x;
    const hammerCenterY = mousePosition.y;

    const activeHoleElement = document.querySelector(`.hole-${activeHole}`);
    if (activeHoleElement) {
      const moleRect = activeHoleElement.getBoundingClientRect();
      const moleCenterX = moleRect.left + moleRect.width / 2;
      const moleCenterY = moleRect.top + moleRect.height / 2;

      const distance = Math.sqrt(
        (hammerCenterX - moleCenterX) ** 2 + (hammerCenterY - moleCenterY) ** 2
      );

      if (distance < hammerRadius + moleRadius) {
        setScore(score + 1);
        setHitMole(activeHole);
        setActiveHole(null);

        setTimeout(() => setHitMole(null), 500);
      }
    }
  };

  return (
    <div className="whac-a-mole" onClick={handleClick}>
      <h1>Super Mole Smash!</h1>
      <div className="score">Score: {score}</div>
      <div className="holes">
        {[...Array(7)].map((_, index) => (
          <MoleHole
            key={index}
            index={index}
            isActive={index === activeHole}
            isHit={index === hitMole}
          />
        ))}
      </div>
      <img
        src="/mallet.png"  // Adjust the path to your hammer image
        alt="Hammer"
        className={`hammer ${isHammerDown ? 'down' : ''}`}
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
    </div>
  );
};

export default WhacAMole;
