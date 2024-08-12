import Header from "./components/Header.jsx";
import BoardContextProvider from "./store/BoardContext.jsx";
import ResultContextProvider from "./store/ResultContext.jsx";
import GameBoard from "./components/GameBoard.jsx";
import ResultModal from "./components/ResultModal.jsx";
import Timer from "./components/Timer.jsx";
import TimerContextProvider from "./store/TimerContext.jsx";

function App() {
  return (
    <ResultContextProvider>
      <TimerContextProvider>
        <BoardContextProvider>
          <Header />
          <Timer />
          <GameBoard />
          <ResultModal />
        </BoardContextProvider>
      </TimerContextProvider>
    </ResultContextProvider>
  );
}

export default App;
