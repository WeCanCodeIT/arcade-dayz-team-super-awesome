import React from "react";

const PongBall = ({ cx, cy, radius }) => {
  return <circle cx={cx} cy={cy} r={radius} fill="white" />;
};

export default PongBall;
