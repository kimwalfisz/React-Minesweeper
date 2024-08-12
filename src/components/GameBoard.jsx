import { useState, useRef, useEffect } from "react";
import Cell from "./Cell.jsx";
import createBoard from "../utils/createBoard.jsx";
import revealCells from "../utils/revealCells.jsx";
import Timer from "./Timer.jsx";
const SIZES = [
  [9, 9, 10],
  [16, 16, 40],
  [24, 24, 70],
];

export default function GameBoard({ onGameover, diff }) {
  const [gridData, setGridData] = useState(createBoard(...SIZES[diff]));
  const [nonMinesCount, setNonMinesCouns] = useState(0);
  const [flagsCount, setFlagsCount] = useState(gridData.minesLocations.length);
  const [gameover, setGameover] = useState({ isOver: false, result: "" });
  const revealedCellsCount = useRef();
  const timerStarted = useRef(false);

  useEffect(() => {
    if (
      nonMinesCount ===
      gridData.board.length * gridData.board[0].length -
        gridData.minesLocations.length
    )
      setGameover({ isOver: true, result: "won" });
  }, [nonMinesCount]);

  function handleClickCell(cellData) {
    if (!timerStarted.current) timerStarted.current = true;
    if (cellData.flagged) return;
    if (cellData.value === "X") {
      setGridData((prevData) => {
        let updatedBoard = JSON.parse(JSON.stringify(prevData.board));
        for (const [bombXCord, bombYCord] of prevData.minesLocations) {
          updatedBoard[bombXCord][bombYCord].revealed = true;
        }
        return { ...prevData, board: updatedBoard };
      });
      setGameover({ isOver: true, result: "lost" });
    } else {
      setGridData((prevData) => {
        let updatedBoard = JSON.parse(JSON.stringify(prevData.board));
        revealedCellsCount.current = revealCells(
          updatedBoard,
          cellData.x,
          cellData.y
        );
        return { ...prevData, board: updatedBoard };
      });
      setNonMinesCouns((prevCount) => prevCount + revealedCellsCount.current);
    }
  }
  function handleRightClickCell(e, cellData) {
    e.preventDefault();
    setFlagsCount((prevCount) => {
      return prevCount + (cellData.flagged ? 1 : -1);
    });
    setGridData((prevData) => {
      let updatedBoard = JSON.parse(JSON.stringify(prevData.board));
      updatedBoard[cellData.x][cellData.y].flagged =
        !prevData.board[cellData.x][cellData.y].flagged;
      return { ...prevData, board: updatedBoard };
    });
  }

  return (
    <>
      <span className="flag">{flagsCount} 📍</span>
      <Timer
        timerStarted={timerStarted.current}
        gameover={gameover.isOver}
        onGameover={(time) => onGameover(time, gameover.result)}
      />
      <div className="board">
        {gridData.board.map((row, rowIdx) => (
          <div class="row" key={rowIdx}>
            {row.map((cell, idx) => (
              <Cell
                key={idx}
                cellData={cell}
                onClickCell={handleClickCell}
                onRightClickCell={handleRightClickCell}
                diff={diff}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
