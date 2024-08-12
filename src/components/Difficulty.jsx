import { useContext } from "react";
import { BoardContext } from "../store/BoardContext.jsx";
import { ResultContext } from "../store/ResultContext.jsx";
import { TimerContext } from "../store/TimerContext.jsx";

export default function Difficulty() {
  const { changeDifficulty } = useContext(BoardContext);
  const { resetResult } = useContext(ResultContext);
  const { resetTimer } = useContext(TimerContext);


  function handleChangeDiff(event) {
    changeDifficulty(+event.target.value);
    resetResult();
    resetTimer();
  }
  return (
    <select
      className="difficulty"
      name="difficulty"
      onChange={handleChangeDiff}
      defaultValue={0}
    >
      <option value={0}>easy</option>
      <option value={1}>medium</option>
      <option value={2}>hard</option>
    </select>
  );
}
