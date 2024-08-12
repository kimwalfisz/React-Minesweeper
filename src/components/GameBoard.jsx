import { useContext } from "react";
import Cell from "./Cell.jsx";
import { BoardContext } from "../store/BoardContext.jsx";

export default function GameBoard() {
  const boardCtx = useContext(BoardContext);

  return (
    <>
      <span className="flag">{boardCtx.flagsCount}&nbsp;&nbsp;📍</span>
      <div className="board">
        {boardCtx.gridData.board.map((row, rowIdx) => (
          <div className="row" key={rowIdx}>
            {row.map((cell, idx) => (
              <Cell
                key={idx}
                cellData={cell}
                onClickCell={boardCtx.handleClickCell}
                onRightClickCell={boardCtx.handleRightClickCell}
                diff={boardCtx.difficulty}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
