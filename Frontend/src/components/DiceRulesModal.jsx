import React from 'react';
import './DiceGame'; 

const DiceRulesModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Game Rules</h2>
        <ul>
          <li>Roll the dice to get different combinations and earn points.</li>
          <li>Combinations and their points:</li>
          <ul>
            <li>Consecutive numbers: Sum of the numbers</li>
            <li>Two of a kind: Sum of the two numbers</li>
            <li>Three of a kind: Three times the number</li>
            <li>All odd numbers: +1 point</li>
            <li>All even numbers: +2 points</li>
          </ul>
          <li>Reach 100 points to win the game!</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DiceRulesModal;
