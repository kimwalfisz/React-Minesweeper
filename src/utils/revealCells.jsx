export default function revealCells(grid, x, y, count = 0) {
    grid[x][y].revealed = true;
    count ++;
    if (grid[x][y].value === 0) {
      let neighbors = [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
      ].filter(([r, c]) => r >= 0 && r < grid.length && c >= 0 && c < grid[0].length);
      for (const [r, c] of neighbors) {
        if (grid[r][c].value !== "X" && !grid[r][c].revealed) {
          count += revealCells(grid, r, c);
        }
      }
    }
    return count;
  }