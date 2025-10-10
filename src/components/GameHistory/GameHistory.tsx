import React from 'react';
import { getMoveDescription } from '../../utils/gameLogic';
import styles from './GameHistory.module.css';

interface GameHistoryProps {
  history: (string | null)[][];
  currentMove: number;
  isAscending: boolean;
  onMoveClick: (move: number) => void;
  onSortToggle: () => void;
}

const GameHistory: React.FC<GameHistoryProps> = ({
  history,
  currentMove,
  isAscending,
  onMoveClick,
  onSortToggle
}) => {
  const generateMoveHistory = () => {
    const movesToRender = isAscending 
      ? history.map((_, index) => index)
      : [...history.keys()].reverse();

    return movesToRender.map((moveIndex) => {
      const description = getMoveDescription(moveIndex, history);
      
      return (
        <li key={moveIndex}>
          <button 
            onClick={() => onMoveClick(moveIndex)}
            className={moveIndex === currentMove ? styles.currentMove : ''}
          >
            {description}
          </button>
        </li>
      );
    });
  };

  return (
    <div className={styles.moveHistory}>
      <h3>移动历史</h3>
      <button 
        onClick={onSortToggle}
        className={styles.sortButton}
      >
        {isAscending ? '↑ 升序排列' : '↓ 降序排列'}
      </button>
      <ol>{generateMoveHistory()}</ol>
    </div>
  );
};

export default GameHistory;