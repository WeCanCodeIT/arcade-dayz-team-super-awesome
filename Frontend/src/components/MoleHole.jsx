import React from 'react';
import './MoleHole.css';
import Mole from './Mole';
import Monster from './Monster';

const MoleHole = ({ index, isActive, isHit, activeCharacter }) => {
  return (
    <div className={`mole-hole hole-${index}`}>
      {isActive && !isHit && activeCharacter === 'mole' && <Mole />}
      {isActive && !isHit && activeCharacter === 'monster' && <Monster />}
      {isHit && <img src="/burst.png" alt="Pow!" className="burst" />} 
    </div>
  );
};

export default MoleHole;
