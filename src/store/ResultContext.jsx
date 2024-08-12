import { createContext, useState } from "react";

export const ResultContext = createContext({
    gameResult: {},
    updateLostGame: () => {},
    updateWonGame: () => {},
    resetResult: () => {},
});

export default function ResultContextProvider({ children }) {
    const [gameResult, setGameResult] = useState("");
    
    function updateLostGame() {
        setGameResult("lost");
    }
    function updateWonGame() {
        setGameResult("won");
    }
    function resetResult() {
        setGameResult("");
    }
    const ctxValue = {
        gameResult,
        updateWonGame,
        updateLostGame,
        resetResult,
    }
    return (
        <ResultContext.Provider value={ctxValue}>{children}</ResultContext.Provider>
      );
}