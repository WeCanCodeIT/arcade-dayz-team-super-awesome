import React from 'react';
import './ConnectFourSlot.css';

const ConnectFourSlot = ({ value, onClick }) => {
  const getColor = () => {
    return value === 'Red' ? 'red' : value === 'Yellow' ? 'yellow' : 'white';
  };

  return (
    <div className="slot" onClick={onClick} style={{ backgroundColor: getColor() }}></div>
  );
};

export default ConnectFourSlot;
