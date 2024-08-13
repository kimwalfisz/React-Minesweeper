import classNames from "classnames";

export default function Cell({
  cellData,
  onClickCell,
  onRightClickCell,
  diff,
}) {
  function deriveBackground(x, y) {
    if ((x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0))
      return "light";
    else return "dark";
  }
  const diffClass = diff === 0 ? "easy" : diff === 1 ? "medium" : "hard";
  const cssClasses = classNames(
    "cell",
    diffClass,
    deriveBackground(cellData.x, cellData.y),
    { revealed: cellData.revealed, [`_${cellData.value}`]: cellData.value > 0 }
  );

  let cellValue;
  if (cellData.revealed) {
    switch (cellData.value) {
      case "X":
        cellValue = "💣";
        break;
      case 0:
        cellValue = null;
        break;
      default:
        cellValue = cellData.value;
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
