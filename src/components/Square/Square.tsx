import React from 'react';
import styles from './Square.module.css';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinning?: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick, isWinning = false }) => {
  return (
    <button 
      className={`${styles.square} ${isWinning ? styles.winningSquare : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

export default Square;