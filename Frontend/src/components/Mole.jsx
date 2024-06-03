import React from 'react';
import './Mole.css';
import moleImage from '../components/mole1.png'; // Adjust the path as necessary

const Mole = () => {
  return <img src={moleImage} alt="Mole" className="mole" />;
};

export default Mole;
