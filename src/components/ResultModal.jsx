import { forwardRef } from "react";
const ResultModal = forwardRef(function ResultModal({gameResult, record, onRestart}, ref) {
    return (<dialog ref={ref} className="result-modal">
        <h2>You {gameResult.result}</h2>
        <p>time score : {gameResult.time}</p>
        <p>best score: {record} 🏆 </p>
        <button onClick={onRestart}>Play again?</button>
    </dialog>);

});
export default ResultModal;