import { useState, useEffect } from "react";

export default function Timer({ timerStarted, gameover, onGameover }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (gameover) {
      onGameover(String(timer).padStart(3, '0'));
    }
    else if (timerStarted) {
      interval = setInterval(
        () => setTimer((prevTimer) => prevTimer + 1),
        1000
      );
    }
    return () => {
      clearInterval(interval);
    }
  }, [timerStarted, gameover]);

  return <span className="timer">{String(timer).padStart(3, '0')} ⏰</span>;
}
