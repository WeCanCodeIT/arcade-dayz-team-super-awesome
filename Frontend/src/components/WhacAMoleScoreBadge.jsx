import React, { useState } from "react";
import "./WhacAMoleScoreBadge.css";

const WhacAMoleScoreBadge = ({ score }) => {
  return (
    <div className="badge">
      <div className="badge-content">
        <span className="badge-text">Score:</span>
        <span className="badge-score">{score}</span>
      </div>
    </div>
  );
};

export default WhacAMoleScoreBadge;
