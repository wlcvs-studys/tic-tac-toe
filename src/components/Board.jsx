import Square from "./Square";
import { calculateWinner } from "./utils/gameLogic";

export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const divs = [];

  for (let i = 0; i < 3; i++) {
    const items = [];
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      items.push(
        <Square
          key={index} 
          value={squares[index]} 
          onSquareClick={() => handleClick(index)}
        />
      );
    }

    divs.push(
      <div key={i} className="board-row">
        {items}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {divs}
    </>
  )
}