import { createContext, useContext, useState, useEffect } from "react";
import createBoard from "../utils/createBoard.jsx";
import revealCells from "../utils/revealCells.jsx";
import { ResultContext } from "./ResultContext.jsx";
import { TimerContext } from "./TimerContext.jsx";

const SIZES = [
  [9, 9, 10],
  [16, 16, 40],
  [24, 24, 70],
];

export const BoardContext = createContext({
  difficulty: 0,
  changeDifficulty: () => {},
  gridData: {},
  flagsCount: 0,
  handleClickCell: () => {},
  handleRightClickCell: () => {},
  resetBoard: () => {}
});

export default function BoardContextProvider({ children }) {

  const [difficulty, setDifficulty] = useState(0);
  const [gridData, setGridData] = useState(createBoard(...SIZES[difficulty]));
  const [flagsCount, setFlagsCount] = useState(gridData.minesLocations.length);
  const [nonMinesCount, setNonMinesCount] = useState(0);
  const resultCtx = useContext(ResultContext);
  const timerCtx = useContext(TimerContext);

  useEffect(() => {
    if (
      nonMinesCount === 
      gridData.board.length * gridData.board[0].length -
        gridData.minesLocations.length
    )
      resultCtx.updateWonGame();
  }, [nonMinesCount]);

  
  function resetBoard(diff=difficulty) {
    setGridData(createBoard(...SIZES[diff]));
    setFlagsCount(SIZES[diff][2]);
    setNonMinesCount(0);
  }
  function changeDifficulty(diff) {
    setDifficulty(diff);
    resetBoard(diff); 
  }
  
  function revealBombs() {
    setGridData((prevData) => {
      let updatedBoard = JSON.parse(JSON.stringify(prevData.board));
      for (const [bombXCord, bombYCord] of prevData.minesLocations) {
        updatedBoard[bombXCord][bombYCord].revealed = true;
      }
      return { ...prevData, board: updatedBoard };
    });
  }

  function revealBoard(x, y) {
    let updatedBoard = JSON.parse(JSON.stringify(gridData.board));
    let currRevealedCount = revealCells(updatedBoard, x, y);
    setNonMinesCount(prevCount  => prevCount + currRevealedCount);
    setGridData((prevData) => {
      return { ...prevData, board: updatedBoard };
    });
  }

  function handleClickCell(cellData) {
    if (!timerCtx.timerStarted) timerCtx.startTimer();
    if (cellData.flagged) return;
    if (cellData.value === "X") {
      revealBombs();
      resultCtx.updateLostGame();
    } else revealBoard(cellData.x, cellData.y);
  }

  function handleRightClickCell(e, cellData) {
    e.preventDefault();
    setFlagsCount(prevCount => {
      return prevCount + (cellData.flagged ? 1 : -1);
    });
    setGridData((prevData) => {
      let updatedBoard = JSON.parse(JSON.stringify(prevData.board));
      let isFlagged = prevData.board[cellData.x][cellData.y].flagged;
      updatedBoard[cellData.x][cellData.y].flagged = !isFlagged;
      return { ...prevData, board: updatedBoard };
    });
  }

  const ctxValue = {
    difficulty,
    changeDifficulty,
    handleClickCell,
    gridData,
    flagsCount,
    handleRightClickCell,
    resetBoard
  };
  return (
    <BoardContext.Provider value={ctxValue}>{children}</BoardContext.Provider>
  );
}
