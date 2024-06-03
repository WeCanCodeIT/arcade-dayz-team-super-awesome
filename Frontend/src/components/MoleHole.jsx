import React from 'react';
import './MoleHole.css';
import Mole from './Mole';

const MoleHole = ({ index, isActive, isHit }) => {
  return (
    <div className={`mole-hole hole-${index}`}>
      {isActive && !isHit && <Mole />}
      {isHit && <img src="/burst.png"  alt="Hit Mole" className="burst" />} {/* Adjust the path to your hit mole image */}
    </div>
  );
};

export default MoleHole;
