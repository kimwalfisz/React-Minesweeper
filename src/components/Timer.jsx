import { TimerContext } from "../store/TimerContext";
import { useContext } from "react";

export default function Timer() {
  const { timer } = useContext(TimerContext);

  return <span className="timer">{String(timer).padStart(3, "0")}&nbsp;&nbsp;⏰</span>;
}
