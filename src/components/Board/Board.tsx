import React, { useMemo } from 'react';
import Square from '../Square/Square';
import { calculateWinner, isBoardFull } from '../../utils/gameLogic';
import styles from './Board.module.css';

interface BoardProps {   
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
  winningLine: number[] | null;
}
//useMemo是react的hook（钩子函数），用来缓存计算结果，避免不必要的重复计算，优化性能
const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay, winningLine }) => {
  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const isBoardFilled = useMemo(() => isBoardFull(squares), [squares]);

  const handleClick = (i: number) => {
    if (winner || isBoardFilled || squares[i]) {
      return;
    }
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  };

  const getGameStatus = (): string => {
    if (winner) {
      return `获胜者: ${winner}`;
    } else if (isBoardFilled) {
      return '平局！';
    } else {
      return `下一位玩家: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  const isWinningSquare = (index: number): boolean => {
    return !!winningLine && winningLine.includes(index);
  };

  const renderBoardRows = () => {
    const rows = [];
    for (let row = 0; row < 3; row++) {
      const squaresInRow = [];
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        squaresInRow.push(
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
            isWinning={isWinningSquare(index)}
          />
        );
      }
      rows.push(
        <div key={row} className={styles.boardRow}>
          {squaresInRow}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className={styles.boardContainer}>
      <div className={styles.status}>{getGameStatus()}</div>
      <div className={styles.board}>
        {renderBoardRows()}
      </div>
    </div>
  );
};

export default Board;