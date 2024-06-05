import React from 'react';
import '../RPSJokerAce.css';

const RPSRulesModal = ({ show, handleClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Rules</h2>
        <p>
          Welcome to the Rock, Paper, Scissors, Joker, Ace Game!
        </p>
        <p>
          - Rock beats Scissors and Joker<br />
          - Paper beats Rock and Joker<br />
          - Scissors beat Paper and Joker<br />
          - Joker beats Ace<br />
          - Ace beats Rock, Paper, and Scissors<br />
        </p>
        <p>
           You can only use each choice once per game.
        </p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default RPSRulesModal;
