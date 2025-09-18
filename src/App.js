// import { useState } from 'react';

// function Square({ value, onSquareClick }) {
//   return (
//     <button className="square" onClick={onSquareClick}>
//       {value}
//     </button>
//   );
// }

// function Board({ xIsNext, squares, onPlay }) {
//   function handleClick(i) {
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     const nextSquares = squares.slice();
//     if (xIsNext) {
//       nextSquares[i] = 'X';
//     } else {
//       nextSquares[i] = 'O';
//     }
//     onPlay(nextSquares);
//   }

//   const winner = calculateWinner(squares);
//   let status;
//   if (winner) {
//     status = 'Winner: ' + winner;
//   } else {
//     status = 'Next player: ' + (xIsNext ? 'X' : 'O');
//   }

//   return (
//     <>
//       <div className="status">{status}</div>
//       <div className="board-row">
//         <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
//         <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
//         <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
//         <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
//         <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
//       </div>
//       <div className="board-row">
//         <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
//         <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
//         <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
//       </div>
//     </>
//   );
// }

// export default function Game() {
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const [currentMove, setCurrentMove] = useState(0);
//   const xIsNext = currentMove % 2 === 0;
//   const currentSquares = history[currentMove];

//   function handlePlay(nextSquares) {
//     const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
//     setHistory(nextHistory);
//     setCurrentMove(nextHistory.length - 1);
//   }

//   function jumpTo(nextMove) {
//     setCurrentMove(nextMove);
//   }

//   const moves = history.map((squares, move) => {
//     let description;
//     if (move > 0) {
//       description = 'Go to move #' + move;
//     } else {
//       description = 'Go to game start';
//     }
//     return (
//       <li key={move}>
//         <button onClick={() => jumpTo(move)}>{description}</button>
//       </li>
//     );
//   });

//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
//       </div>
//       <div className="game-info">
//         <ol>{moves}</ol>
//       </div>
//     </div>
//   );
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }
// 导入React核心库和useState Hook（用于管理组件状态）
import React, { useState } from 'react';
// 导入样式文件
import './styles.css';

// 1. 定义单个方块组件（Square）：负责显示单个格子，接收父组件传递的属性
// props参数包含：
// - value：当前格子的值（X/O/null）
// - isWinningSquare：是否为获胜组合的格子（用于高亮）
// - onSquareClick：点击格子的回调函数（由父组件传递，触发状态更新）
function Square({ value, isWinningSquare, onSquareClick }) {
  return (
    // 按钮元素：展示格子内容，绑定点击事件
    <button
      // 动态添加样式：基础样式square + 获胜格子样式winning（条件渲染）
      className={`square ${isWinningSquare ? 'winning' : ''}`}
      // 点击事件：调用父组件传递的onSquareClick，仅当格子为空且有回调时可点击
      onClick={onSquareClick}
      // 禁用状态：当格子有值（X/O）时禁用按钮，防止重复点击
      disabled={value !== null}
    >
      {/* 显示格子的值（X/O/null，null时显示空） */}
      {value}
    </button>
  );
}

// 2. 定义棋盘组件（Board）：负责渲染3x3格子矩阵，处理格子点击逻辑
// props参数包含：
// - squares：当前所有格子的状态数组（长度9，对应3x3格子）
// - winningSquares：获胜组合的格子索引数组（如[0,1,2]，用于高亮）
// - onSquareClick：点击格子的回调函数（传递给Square组件）
function Board({ squares, winningSquares, onSquareClick }) {
  // 需求2：用两个循环生成3x3方块，而非硬编码
  // 外层循环：生成3行（row从0到2，对应第1-3行）
  const renderBoardRows = () => {
    // 存储所有行的JSX元素
    const rows = [];
    // 外层循环：控制行数（3行）
    for (let row = 0; row < 3; row++) {
      // 存储当前行的所有格子JSX元素
      const squaresInRow = [];
      // 内层循环：控制每行的列数（3列，col从0到2，对应第1-3列）
      for (let col = 0; col < 3; col++) {
        // 计算当前格子在squares数组中的索引（公式：row*3 + col，如第2行第3列：1*3+2=5）
        const squareIndex = row * 3 + col;
        // 向当前行添加一个Square组件
        squaresInRow.push(
          <Square
            key={squareIndex} // 必须添加key，React用于高效更新列表（唯一标识每个格子）
            value={squares[squareIndex]} // 传递当前格子的值
            // 判断当前格子是否为获胜组合的一部分（winningSquares包含当前索引则高亮）
            isWinningSquare={winningSquares.includes(squareIndex)}
            // 点击事件：调用父组件传递的onSquareClick，传递当前格子索引
            onSquareClick={() => onSquareClick(squareIndex)}
          />
        );
      }
      // 向rows数组添加当前行（用board-row类包裹，实现行布局）
      rows.push(
        <div key={row} className="board-row">
          {squaresInRow}
        </div>
      );
    }
    // 返回所有行的JSX元素
    return rows;
  };

  // 渲染棋盘：返回循环生成的3x3格子矩阵
  return <div className="board">{renderBoardRows()}</div>;
}

// 3. 定义游戏主组件（Game）：管理全局状态，协调Board和历史记录
function Game() {
  // -------------- 状态管理：使用useState Hook定义组件状态 --------------
  // 1. history：存储游戏历史记录（数组）
  // 每个元素是一个对象：{ squares: 当时的格子状态数组, movePosition: 该步的(row,col)位置 }
  // 初始值：包含一个初始状态（9个null的格子数组，初始步无位置）
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), movePosition: null },
  ]);

  // 2. currentMove：当前步数（数字），初始为0（对应history的第一个元素）
  const [currentMove, setCurrentMove] = useState(0);

  // 3. isSortAscending：历史记录排序方向（布尔值），true=升序，false=降序，初始为true
  const [isSortAscending, setIsSortAscending] = useState(true);

  // -------------- 派生状态：从基础状态计算得出，无需用useState --------------
  // 1. currentSquares：当前步数的格子状态（从history中获取）
  const currentSquares = history[currentMove].squares;

  // 2. isXNext：判断当前该谁下棋（X先下，步数为偶数时X下，奇数时O下）
  const isXNext = currentMove % 2 === 0;

  // 3. calculateWinnerResult：计算当前游戏结果（获胜者、获胜格子索引）
  // 返回对象：{ winner: 'X'/'O'/null, winningSquares: [索引数组]/[] }
  const calculateWinnerResult = (squares) => {
    // 所有可能的获胜组合（3个格子的索引，共8种：3横、3竖、2斜）
    const winningCombinations = [
      [0, 1, 2], // 第一行
      [3, 4, 5], // 第二行
      [6, 7, 8], // 第三行
      [0, 3, 6], // 第一列
      [1, 4, 7], // 第二列
      [2, 5, 8], // 第三列
      [0, 4, 8], // 左上到右下斜
      [2, 4, 6], // 右上到左下斜
    ];

    // 遍历所有获胜组合，检查是否有玩家满足
    for (const combination of winningCombinations) {
      const [a, b, c] = combination; // 解构当前组合的3个格子索引
      // 若3个格子的值相同且不为null，则该玩家获胜
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a], // 获胜者（X/O）
          winningSquares: combination, // 获胜的3个格子索引
        };
      }
    }

    // 若无获胜者：判断是否平局（所有格子都有值）或游戏继续
    const isDraw = squares.every((square) => square !== null);
    return {
      winner: isDraw ? 'draw' : null, // 'draw'=平局，null=游戏继续
      winningSquares: [], // 平局/继续时无获胜格子
    };
  };

  // 4. gameResult：当前游戏结果（调用上面的计算函数）
  const gameResult = calculateWinnerResult(currentSquares);
  const { winner, winningSquares } = gameResult;

  // -------------- 事件处理函数：响应用户交互 --------------
  // 1. handleSquareClick：处理格子点击事件（传递给Board组件）
  // 参数：clickedSquareIndex（被点击的格子索引，0-8）
  const handleSquareClick = (clickedSquareIndex) => {
    // 若已获胜或当前格子有值，直接返回（阻止无效点击）
    if (winner || currentSquares[clickedSquareIndex] !== null) {
      return;
    }

    // 截取历史记录到当前步数（用于回退后重新下棋，清除后续无效记录）
    const newHistory = history.slice(0, currentMove + 1);
    // 当前步数的格子状态（复制一份，避免直接修改原数组，遵循React不可变数据原则）
    const currentSquaresCopy = [...currentSquares];

    // 计算当前点击的格子对应的（row, col）位置（需求5：用于历史记录显示）
    // row = 索引 / 3 取整（如索引5：5/3=1.666→1，对应第2行）
    // col = 索引 % 3 取余（如索引5：5%3=2，对应第3列）
    // +1是因为需求要求显示1-based（第一行第一列，而非0-based）
    const row = Math.floor(clickedSquareIndex / 3) + 1;
    const col = (clickedSquareIndex % 3) + 1;

    // 更新点击的格子值（X或O）
    currentSquaresCopy[clickedSquareIndex] = isXNext ? 'X' : 'O';

    // 更新历史记录状态：添加新的一步到history数组
    setHistory([
      ...newHistory, // 保留之前的历史
      {
        squares: currentSquaresCopy, // 新的格子状态
        movePosition: { row, col }, // 新一步的（row, col）位置
      },
    ]);

    // 更新当前步数：跳到最新一步
    setCurrentMove(newHistory.length);
  };

  // 2. jumpToMove：跳转到指定步数（点击历史记录时触发）
  // 参数：targetMove（目标步数，0-历史记录长度-1）
  const jumpToMove = (targetMove) => {
    setCurrentMove(targetMove);
  };

  // 3. toggleSortOrder：切换历史记录排序方向（点击排序按钮时触发）
  const toggleSortOrder = () => {
    setIsSortAscending(!isSortAscending);
  };

  // 4. resetGame：重置游戏（重新开始）
  const resetGame = () => {
    // 恢复初始状态：history回到初始值，currentMove回到0
    setHistory([{ squares: Array(9).fill(null), movePosition: null }]);
    setCurrentMove(0);
  };

  // -------------- 渲染辅助函数：生成UI元素 --------------
  // 1. renderMoveHistory：生成历史记录列表（含排序功能）
  const renderMoveHistory = () => {
    // 处理历史记录排序：根据isSortAscending决定顺序
    const sortedHistory = isSortAscending
      ? history // 升序：原顺序（从第一步到最后一步）
      : [...history].reverse(); // 降序：反转数组（从最后一步到第一步）

    // 映射历史记录为按钮列表
    const moveButtons = sortedHistory.map((step, stepIndex) => {
      // 计算原始步数（因为反转后索引对应关系变化，需还原真实步数）
      const originalMoveNumber = isSortAscending ? stepIndex : history.length - 1 - stepIndex;

      // 生成按钮文本：
      // - 第0步（初始状态）："游戏开始"
      // - 其他步："第X步：(row, col)"（显示该步的位置，需求5）
      const buttonText = originalMoveNumber === 0
        ? '游戏开始'
        : `第${originalMoveNumber}步：(${step.movePosition.row}, ${step.movePosition.col})`;

      // 生成当前移动的文本（需求1：仅当前移动显示"X/O在移动 #..."，而非按钮）
      if (originalMoveNumber === currentMove) {
        // 当前玩家：X或O（originalMoveNumber为偶数→X，奇数→O）
        const currentPlayer = originalMoveNumber % 2 === 0 ? 'X' : 'O';
        return (
          <li key={originalMoveNumber} className="current-move-indicator">
            {/* 高亮显示当前移动，无按钮 */}
            <span>{currentPlayer} 在移动 #{originalMoveNumber}</span>
          </li>
        );
      }

      // 非当前移动：显示按钮，点击跳转到对应步数
      return (
        <li key={originalMoveNumber}>
          <button
            className="move-button"
            onClick={() => jumpToMove(originalMoveNumber)}
          >
            {buttonText}
          </button>
        </li>
      );
    });

    // 返回历史记录列表和排序按钮
    return (
      <div className="move-history">
        <h3>游戏历史</h3>
        {/* 排序按钮：显示当前排序方向，点击切换 */}
        <button className="sort-button" onClick={toggleSortOrder}>
          {isSortAscending ? '当前：升序（从第一步开始）' : '当前：降序（从最后一步开始）'}
        </button>
        {/* 历史记录列表 */}
        <ul className="move-list">{moveButtons}</ul>
        {/* 重新开始按钮 */}
        <button className="reset-button" onClick={resetGame}>
          重新开始游戏
        </button>
      </div>
    );
  };

  // 2. renderGameStatus：生成当前游戏状态文本（谁下棋、获胜、平局）
  const renderGameStatus = () => {
    let statusText;
    if (winner === 'draw') {
      // 需求4：平局时显示平局消息
      statusText = '游戏结果：平局！';
    } else if (winner) {
      // 获胜时显示获胜者
      statusText = `游戏结果：${winner} 获胜！`;
    } else {
      // 游戏继续时显示当前该谁下棋
      statusText = `当前回合：${isXNext ? 'X' : 'O'} 下棋`;
    }
    return <div className="game-status">{statusText}</div>;
  };

  // -------------- 主组件渲染：组合所有UI元素 --------------
  return (
    <div className="game-container">
      {/* 游戏标题 */}
      <h1 className="game-title">React 井字棋</h1>

      {/* 游戏主体：棋盘 + 状态 */}
      <div className="game-board-section">
        {/* 游戏状态（谁下棋、结果） */}
        {renderGameStatus()}
        {/* 棋盘组件：传递当前格子状态、获胜格子、点击事件 */}
        <Board
          squares={currentSquares}
          winningSquares={winningSquares}
          onSquareClick={handleSquareClick}
        />
      </div>

      {/* 历史记录区域：传递排序后的历史记录 */}
      <div className="game-history-section">
        {renderMoveHistory()}
      </div>
    </div>
  );
}

// 导出Game组件，作为App的入口（在index.js中渲染）
export default Game;