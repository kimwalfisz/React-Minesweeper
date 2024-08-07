import GameBoard from "./components/GameBoard.jsx";
import Difficulty from "./components/Difficulty.jsx";
import ResultModal from "./components/ResultModal.jsx";
import { useState, useRef, useEffect } from "react";

function App() {

  const [newGame, setNewGame] = useState({
    gameKey: 0,
    diff: 0,
  });
  const [gameResult, setGameResult] = useState({result: "", time:""});
  const resultModalRef = useRef();
  const [record, setRecord] = useState("");

  useEffect(() => {
    const storedRecord = localStorage.getItem('userRecord') || Infinity;
    if (gameResult.result === "lost") {
      setRecord(storedRecord === Infinity ? "" : storedRecord);
    }
    else if (gameResult.result === 'won' && +gameResult.time < +storedRecord) {
      localStorage.setItem('userRecord', gameResult.time);
      setRecord(gameResult.time);
    }
  }, [gameResult]);

  function handleChangeDiff(event) {
    setNewGame((prevGame) => ({
      gameKey: prevGame.gameKey + 1,
      diff: +event.target.value,
    }));
  }

  function handleGameover(time, result) {
    setGameResult({result: result, time: time});
    setTimeout(() => resultModalRef.current.showModal(), 2000);
  }

  function handleRestart() {
    resultModalRef.current.close();
    setGameResult({result: "", time: ""});
    setNewGame((prevGame) => ({
      ...prevGame,
      gameKey: prevGame.gameKey + 1,
    }));
  }

  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <Difficulty onChangeDiff={handleChangeDiff} />
      <GameBoard
        key={newGame.gameKey}
        onGameover={handleGameover}
        diff={newGame.diff}
      />
      <ResultModal
        gameResult={gameResult}
        record={record}
        onRestart={handleRestart}
        ref={resultModalRef}
      />
    </div>
  );
}

export default App;
