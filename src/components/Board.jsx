import Square from "./Square";
import { calculateWinner } from "./utils/gameLogic";

export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const result = calculateWinner(squares);
  const { winner, line } = result || { winner: null, line: [] };  

  let status = winner
  ? "Winner: " + winner
  : "Next player: " + (xIsNext ? "X" : "O");

  const divs = [];
  for (let i = 0; i < 3; i++) {
    const items = [];
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      items.push(
        <Square
          style={line.includes(index) ? { backgroundColor: '#12de12' } : {}}
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