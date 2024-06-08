import React from 'react';
import ConnectFourSlot from './ConnectFourSlot';

const ConnectFourRow = ({ row, onDrop }) => {
  return (
    <tr>
      {row.map((cell, columnIndex) => (
        <ConnectFourSlot
          key={columnIndex}
          value={cell}
          onDrop={() => onDrop(columnIndex)}
        />
      ))}
    </tr>
  );
};

export default ConnectFourRow;
