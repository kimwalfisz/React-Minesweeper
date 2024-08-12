import { useRef, useContext, useEffect } from "react";
import { ResultContext } from "../store/ResultContext";
import { BoardContext } from "../store/BoardContext";
import { TimerContext } from "../store/TimerContext";

const ResultModal = function ResultModal() {

  const boardCtx = useContext(BoardContext);
  const timerCtx = useContext(TimerContext);
  const { gameResult, resetResult } = useContext(ResultContext);
  const dialogRef = useRef();

  useEffect(() => {
    if (gameResult && timerCtx.timeResult) {
      setTimeout(() => dialogRef.current.showModal(), 2000);
    }
    return () => {
      dialogRef.current.close();
    };
  }, [gameResult, timerCtx.timeResult, timerCtx.record]);

  function handleRestart() {
    boardCtx.resetBoard();
    resetResult();
    timerCtx.resetTimer();
  }

  return (
    <dialog ref={dialogRef}>
      <div className="result-modal">
        <h2>You {gameResult}</h2>
        <p>time score: {timerCtx.timeResult}</p>
        <p>best score: {timerCtx.record} 🏆 </p>
        <button onClick={handleRestart}>Play again?</button>
      </div>
    </dialog>
  );
};
export default ResultModal;
