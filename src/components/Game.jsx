import { useState } from 'react';
import Board from './Board';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [order, setOrder] = useState("ascending");
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  let moves = history.map((squares, move) => {
    let description;
    if (move === 0) {
      description = "Go to game start";
    } else if (move === currentMove) {
        description = "You are at move #" + move;
        return (
          <li key={move}>
            <p>{description}</p>
          </li>
        )
    } else {
      description = "Go to move #" + move;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  if (order === "descending") {
    moves = moves.slice().reverse();
  }

  function changeOrder() {
      setOrder(order === "ascending" ? "descending" : "ascending");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={changeOrder}>{order === "ascending" ? "descending" : "ascending"}</button>
        <ul>{moves}</ul>
      </div>
    </div>
  );
}
