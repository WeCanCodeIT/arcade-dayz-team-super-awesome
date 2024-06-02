import React from "react";

const Paddle = ({ x, y, width, height }) => {
  return <rect x={x} y={y} width={width} height={height} fill="white" />;
};

export default Paddle;
