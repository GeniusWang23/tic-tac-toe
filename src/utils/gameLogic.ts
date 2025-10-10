// 游戏逻辑工具函数

export const calculateWinner = (squares: (string | null)[]): string | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 行
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 列
    [0, 4, 8], [2, 4, 6] // 对角线
  ];
  
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export const isBoardFull = (squares: (string | null)[]): boolean => {
  return squares.every(square => square !== null);
};

export const getWinningLine = (squares: (string | null)[]): number[] | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return line;
    }
  }
  return null;
};

export const getMoveDescription = (moveIndex: number, history: (string | null)[][]): string => {
  if (moveIndex === 0) return '游戏开始';
  
  const currentSquares = history[moveIndex];
  const previousSquares = history[moveIndex - 1];
  
  // 找到移动的位置
  for (let i = 0; i < currentSquares.length; i++) {
    if (currentSquares[i] !== previousSquares[i]) {
      const row = Math.floor(i / 3) + 1;
      const col = (i % 3) + 1;
      const player = moveIndex % 2 === 1 ? 'X' : 'O';
      return `移动#${moveIndex}: ${player}下在 (第${row}行, 第${col}列)`;
    }
  }
  return `移动#${moveIndex}`;
};