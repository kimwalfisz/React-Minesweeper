
export default function Cell({ cellData, onClickCell, onRightClickCell, diff }) {

  function deriveBackground(x, y) {
    if ((x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0)) return 'light';
    else return 'dark';
  }
  const diffClass = diff === 0 ? "easy" : diff === 1 ? "medium" : "hard";
  let cssClasses = `cell ${diffClass} ${deriveBackground(cellData.x, cellData.y)}`;
  let cellValue;
  if (cellData.revealed) {
    cssClasses += " revealed";
    if (cellData.value === 'X') cellValue = '💣';
    else if (cellData.value === 0) {
      cellValue = null;
    }
    else {
      cellValue = cellData.value;
      cssClasses += ` _${cellData.value}`
    }
  }
  if (cellData.flagged) cellValue = "📍";
  
  return (
    <div
      onClick={() => onClickCell(cellData)}
      onContextMenu={(e) => onRightClickCell(e, cellData)}
      className={cssClasses} 
    >
      {cellValue}
    </div>
  );
}
