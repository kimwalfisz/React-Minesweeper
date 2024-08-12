import { createContext, useState, useEffect, useContext } from "react";
import { ResultContext } from "./ResultContext";

export const TimerContext = createContext({
  timer: 0,
  timeResult: "",
  timerStarted: false,
  resetTimer: () => {},
  startTimer: () => {},
  record: ""
});

export default function TimerContextProvider({ children }) {
  const [timer, setTimer] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeResult, setTimeResult] = useState("");
  const { gameResult } = useContext(ResultContext);
  const [record, setRecord] = useState("");

  useEffect(() => {
    if (timeResult) {
      const storedRecord = localStorage.getItem("userRecord") || Infinity;
      if (gameResult === "lost") {
        setRecord(storedRecord === Infinity ? "" : storedRecord);
      } else if (gameResult === "won" && +timeResult < +storedRecord) {
        localStorage.setItem("userRecord", timeResult);
        setRecord(timeResult);
      }
    }
  }, [timeResult]);

  useEffect(() => {
    let interval;
    if (!timeResult) {
      if (gameResult) {
        setTimeResult(String(timer).padStart(3, "0"));
      } else if (timerStarted) {
        interval = setInterval(
          () => setTimer((prevTimer) => prevTimer + 1),
          1000
        );
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerStarted, gameResult]);

  function startTimer() {
    setTimerStarted(true);
  }
  function resetTimer() {
    setTimerStarted(false);
    setTimer(0);
    setTimeResult("");
  }
  const ctxValue = {
    timer,
    record,
    timeResult,
    timerStarted,
    resetTimer,
    startTimer,
  };
  return (
    <TimerContext.Provider value={ctxValue}>{children}</TimerContext.Provider>
  );
}
