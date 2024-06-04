
import React, { useState, useEffect } from 'react';
import MoleHole from '../components/MoleHole';
import WhacAMoleScoreBadge from '../components/WhacAMoleScoreBadge'
import './WhacAMole.css';

const WhacAMole = ({ score, setScore }) => {
  const [activeHole, setActiveHole] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHammerDown, setIsHammerDown] = useState(false);
  const [hitMole, setHitMole] = useState(null);
  const [hitMonster, setHitMonster] = useState(null);
  const [activeCharacter, setActiveCharacter] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActiveHole = Math.floor(Math.random() * 7);
      const isMonster = Math.random() < 0.5;

      setActiveHole(newActiveHole);
      setActiveCharacter(isMonster ? 'monster' : 'mole');
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
    setTimeout(() => setIsHammerDown(false), 200);

    const hammerRadius = 25; 
    const characterRadius = 40; 
    const hammerCenterX = mousePosition.x;
    const hammerCenterY = mousePosition.y;

    const activeHoleElement = document.querySelector(`.hole-${activeHole}`);
    if (activeHoleElement) {
      const characterRect = activeHoleElement.getBoundingClientRect();
      const characterCenterX = characterRect.left + characterRect.width / 2;
      const characterCenterY = characterRect.top + characterRect.height / 2;

      const distance = Math.sqrt(
        (hammerCenterX - characterCenterX) ** 2 + (hammerCenterY - characterCenterY) ** 2
      );

      if (distance < hammerRadius + characterRadius) {
        if(activeCharacter === 'mole'){
          setScore(prevScore => prevScore + 1);
          setHitMole(activeHole);
  
        } else if (activeCharacter === 'monster'){
          setScore(prevScore => prevScore - 10);
          setHitMonster(activeHole);
         }

         setActiveHole(null);
         setActiveCharacter(null);
        

        setTimeout(() => {
          setHitMole(null);
          setHitMonster(null);
      }, 500);
    }
    }
  };

  return (
    <div className="whac-a-mole" onClick={handleClick}>
    <div className="mole-title">
      <h1>Super Mole Smash!</h1>
      </div>
      <div className="holes">
        {[...Array(7)].map((_, index) => (
          <MoleHole
            key={index}
            index={index}
            isActive={index === activeHole}
            isHit={index === hitMole || index === hitMonster}
            activeCharacter={index === activeHole ? activeCharacter : null}
          />
        ))}
      </div>
      <img
        src="/mallet.png"
        alt="Hammer"
        className={`hammer ${isHammerDown ? 'down' : ''}`}
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
    </div>
  );
};

export default WhacAMole;
