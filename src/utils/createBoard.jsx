function createBoard(rows, cols, bombs) {
  let board = [];
  let minesLocations = [];

  for (let i = 0; i < rows; i++) {
    const subArr = [];
    for (let j = 0; j < cols; j++) {
      subArr.push({
        revealed: false,
        value: 0,
        x: i,
        y: j,
        flagged: false,
      });
    }
    board.push(subArr);
  }
  let bombCount = 0;
  while (bombCount < bombs) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);
    if (board[r][c].value === 0) {
      board[r][c].value = "X";
      minesLocations.push([r, c]);
      bombCount++;
    }
  }

  for (let i = 0; i < rows; i ++) {
    for (let j = 0; j < cols; j ++) {
      let neighborBombs = 0;
      if (board[i][j].value !== 'X') {
        if (i-1 >= 0 && j-1 >= 0 && board[i-1][j-1].value === 'X') neighborBombs ++;
        if (i-1 >= 0 && board[i-1][j].value === 'X') neighborBombs ++;
        if (i-1 >= 0 && j+1 < cols && board[i-1][j+1].value === 'X') neighborBombs ++;
        if (j-1 >= 0 && board[i][j-1].value === 'X') neighborBombs ++;
        if (j+1 < cols && board[i][j+1].value === 'X') neighborBombs ++;
        if (i+1 < rows && j-1 >= 0 && board[i+1][j-1].value === 'X') neighborBombs ++;
        if (i+1 < rows && board[i+1][j].value === 'X') neighborBombs ++;
        if (i+1 < rows && j+1 < cols && board[i+1][j+1].value === 'X') neighborBombs ++;
        board[i][j].value = neighborBombs;
      }
    }
  }
  return {board, minesLocations};
}
export default createBoard;
