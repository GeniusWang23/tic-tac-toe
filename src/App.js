import { useState } from 'react';
import './styles.css';

// 方块组件
function Square({ value, onSquareClick, isWinning }) {
  return (
    <button 
      className={`square ${isWinning ? 'winning-square' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

// 棋盘组件 - 修正行列顺序，最上面是第一行，最下面是第三行
function Board({ xIsNext, squares, onPlay, winningLine }) {
  function handleClick(i) {
    if (calculateWinner(squares) || isBoardFull(squares) || squares[i]) {
      return;
    }
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O'; // 交替显示X和O
    onPlay(nextSquares);
  }

  function renderSquare(i) {
    const isWinningSquare = winningLine && winningLine.includes(i);
    return (
      <Square 
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        isWinning={isWinningSquare}
      />
    );
  }

  // 修正：最上面是第一行(索引0-2)，最下面是第三行(索引6-8)
  return (
    <>
      <div className="status">{status}</div>
      
      <div className="board">
        {/* 第一行（最上面一行）- 索引0-2 */}
        <div className="board-row top-row">
          {renderSquare(0)} {/* 第1行第1列 */}
          {renderSquare(1)} {/* 第1行第2列 */}
          {renderSquare(2)} {/* 第1行第3列 */}
        </div>
        
        {/* 第二行（中间一行）- 索引3-5 */}
        <div className="board-row middle-row">
          {renderSquare(3)} {/* 第2行第1列 */}
          {renderSquare(4)} {/* 第2行第2列 */}
          {renderSquare(5)} {/* 第2行第3列 */}
        </div>
        
        {/* 第三行（最下面一行）- 索引6-8 */}
        <div className="board-row bottom-row">
          {renderSquare(6)} {/* 第3行第1列 */}
          {renderSquare(7)} {/* 第3行第2列 */}
          {renderSquare(8)} {/* 第3行第3列 */}
        </div>
      </div>
    </>
  );

  // 计算游戏状态
  const winner = calculateWinner(squares);
  const isBoardFilled = isBoardFull(squares);
  let status;
  
  if (winner) {
    status = '获胜者: ' + winner;
  } else if (isBoardFilled) {
    status = '平局！';
  } else {
    status = '下一位玩家: ' + (xIsNext ? 'X' : 'O'); // 清晰显示下一位玩家
  }
}

// 辅助函数：计算获胜者
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // 第1行（最上面）
    [3, 4, 5], // 第2行（中间）
    [6, 7, 8], // 第3行（最下面）
    [0, 3, 6], // 第1列（最左边）
    [1, 4, 7], // 第2列（中间）
    [2, 5, 8], // 第3列（最右边）
    [0, 4, 8], // 主对角线
    [2, 4, 6], // 副对角线
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// 辅助函数：检测平局
function isBoardFull(squares) {
  return squares.every(square => square !== null);
}

// 游戏主组件
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(false); // 默认降序，符合图片显示
  const [scores, setScores] = useState({ X: 0, O: 0, 平局: 0 });

  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const isBoardFilled = isBoardFull(currentSquares);
  
  let status;
  if (winner) {
    status = '获胜者: ' + winner;
  } else if (isBoardFilled) {
    status = '平局！';
  } else {
    status = '下一位玩家: ' + (xIsNext ? 'X' : 'O');
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
    
    // 更新分数
    if (winner) {
      setScores(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
    } else if (isBoardFilled) {
      setScores(prev => ({ ...prev, 平局: prev.平局 + 1 }));
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  function generateMoveHistory() {
    const movesToRender = isAscending ? history : [...history].reverse();
    const moveIndices = isAscending 
      ? Array.from({length: history.length}, (_, i) => i) 
      : Array.from({length: history.length}, (_, i) => history.length - 1 - i);

    return movesToRender.map((squares, moveIndex) => {
      const actualMoveIndex = isAscending ? moveIndex : history.length - 1 - moveIndex;
      let description;
      
      if (actualMoveIndex === 0) {
        description = '游戏开始';
      } else {
        // 修正：最上面是第1行，最下面是第3行
        const row = Math.floor((actualMoveIndex - 1) / 3) + 1; // 1=第1行(最上), 3=第3行(最下)
        const col = ((actualMoveIndex - 1) % 3) + 1; // 1=第1列(最左), 3=第3列(最右)
        const player = actualMoveIndex % 2 === 1 ? 'X' : 'O'; // 修正：奇数步是X，偶数步是O
        description = `移动#${actualMoveIndex}: ${player}下在 (第${row}行, 第${col}列)`;
      }
      
      return (
        <li key={actualMoveIndex}>
          <button 
            onClick={() => jumpTo(actualMoveIndex)}
            className={actualMoveIndex === currentMove ? 'current-move' : ''}
          >
            {description}
          </button>
        </li>
      );
    });
  }

  function getWinningLine() {
    const win = calculateWinner(currentSquares);
    if (!win) return null;

    const winPatterns = {
      0: [0, 1, 2], // 第1行
      1: [3, 4, 5], // 第2行
      2: [6, 7, 8], // 第3行
      3: [0, 3, 6], // 第1列
      4: [1, 4, 7], // 第2列
      5: [2, 5, 8], // 第3列
      6: [0, 4, 8], // 主对角线
      7: [2, 4, 6]  // 副对角线
    };

    for (const [patternIndex, indices] of Object.entries(winPatterns)) {
      const [a, b, c] = indices.map(Number);
      if (currentSquares[a] && 
          currentSquares[a] === currentSquares[b] && 
          currentSquares[a] === currentSquares[c]) {
        return indices;
      }
    }
    return null;
  }

  const winningLine = getWinningLine();

  return (
    <div className="game">
      {/* 游戏头部 - 显示分数（与图片一致） */}
      <div className="game-header">
        <h1>井字棋游戏</h1>
        <div className="scores">
          <span>🔴 X玩家: {scores.X} 分</span>
          <span>🔵 O玩家: {scores.O} 分</span>
          <span>⚪ 平局: {scores.平局} 次</span>
        </div>
      </div>
      
      <div className="game-main">
        <div className="game-board">
          <Board 
            xIsNext={xIsNext} 
            squares={currentSquares} 
            onPlay={handlePlay}
            winningLine={winningLine}
          />
        </div>
        
        <div className="game-info">
          <div className="move-history">
            <h3>移动历史</h3>
            <button 
              onClick={() => setIsAscending(!isAscending)}
              className="sort-button"
            >
              {isAscending ? '↑ 升序排列' : '↓ 降序排列'}
            </button>
            <ol>{generateMoveHistory()}</ol>
          </div>
        </div>
      </div>
    </div>
  );
}