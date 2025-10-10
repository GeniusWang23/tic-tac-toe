// 导入React库和需要的钩子函数（useState用于状态管理，useCallback用于缓存函数）
import React, { useState, useCallback } from 'react';
// 导入棋盘组件（负责显示井字棋格子）
import Board from './components/Board/Board';
// 导入游戏历史记录组件（显示每一步的走法记录）
import GameHistory from './components/GameHistory/GameHistory';
// 导入判断获胜线的工具函数（用于检测谁赢了）
import { getWinningLine } from './utils/gameLogic';
// 导入当前组件的样式文件
import styles from './App.module.css';

// 定义App组件（React函数式组件，FC是FunctionComponent的缩写）
const App: React.FC = () => {
  //带类型的useState，明确指明类型是boolean
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  
  // 状态：记录游戏历史（每一步的棋盘状态）
  // 初始值是一个数组，里面有一个9个元素的数组（代表3x3棋盘，初始全为null，即空）
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  
  const [currentMove, setCurrentMove] = useState<number>(0);
  
  // 状态：记录历史记录的排序方式（false是降序，true是升序）
  const [isAscending, setIsAscending] = useState<boolean>(false);
  
  // 状态：记录分数（X、O的获胜次数和平局次数）
  const [scores, setScores] = useState<{ X: number; O: number; 平局: number }>({ 
    X: 0, 
    O: 0, 
    平局: 0 
  });

  const currentSquares = history[currentMove];
  
  const winningLine = getWinningLine(currentSquares);

  // 处理下棋的函数（用useCallback缓存，避免每次渲染重新创建）
  // 参数nextSquares是下完一步后的新棋盘状态
  const handlePlay = useCallback((nextSquares: (string | null)[]) => {
    // 生成新的历史记录：保留当前步数之前的记录，加上新的棋盘状态
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // 更新历史记录
    setHistory(nextHistory);
    // 更新当前步数为最新一步
    setCurrentMove(nextHistory.length - 1);
    // 切换玩家（X之后是O，O之后是X）
    setXIsNext(!xIsNext);
  }, [history, currentMove, xIsNext]); // 依赖项：当这些值变化时，函数才会重新创建

  // 跳转到某一步的函数（用useCallback缓存）
  // 参数nextMove是要跳转的步数
  const jumpTo = useCallback((nextMove: number) => {
    // 更新当前步数
    setCurrentMove(nextMove);
    // 根据步数判断当前该谁下：偶数步（0、2、4...）是X，奇数步是O
    setXIsNext(nextMove % 2 === 0);
  }, []); // 无依赖项，函数不会重新创建

  // 切换历史记录排序方式的函数（升序/降序）
  const handleSortToggle = useCallback(() => {
    // 取反当前排序状态（true变false，false变true）
    setIsAscending(prev => !prev);
  }, []); // 无依赖项

  // 渲染组件的结构
  return (
    // 最外层容器，使用样式文件中的game类
    <div className={styles.game}>
      {/* 游戏头部：标题和分数 */}
      <div className={styles.gameHeader}>
        <h1>井字棋游戏</h1>
        {/* 分数显示区域 */}
        <div className={styles.scores}>
          <span>🔴 X玩家: {scores.X} 分</span>
          <span>🔵 O玩家: {scores.O} 分</span>
          <span>⚪ 平局: {scores.平局} 次</span>
        </div>
      </div>
      
      {/* 游戏主体：棋盘和历史记录 */}
      <div className={styles.gameMain}>
        {/* 棋盘区域 */}
        <div className={styles.gameBoard}>
          {/* 渲染棋盘组件，传递必要的属性 */}
          <Board 
            xIsNext={xIsNext}  // 当前该谁下棋
            squares={currentSquares}  // 当前棋盘状态
            onPlay={handlePlay}  // 下棋时触发的函数
            winningLine={winningLine}  // 获胜的线（用于高亮显示）
          />
        </div>
        
        {/* 游戏信息区域：历史记录 */}
        <div className={styles.gameInfo}>
          {/* 渲染历史记录组件，传递必要的属性 */}
          <GameHistory
            history={history}  // 完整的历史记录
            currentMove={currentMove}  // 当前步数
            isAscending={isAscending}  // 排序方式
            onMoveClick={jumpTo}  // 点击某一步时触发的跳转函数
            onSortToggle={handleSortToggle}  // 切换排序方式的函数
          />
        </div>
      </div>
    </div>
  );
};

// 导出App组件，作为整个应用的入口
export default App;