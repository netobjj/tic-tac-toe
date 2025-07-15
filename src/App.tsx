import React, { useState } from "react";


type SquareProps = {
  value: string,
  onSquareClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return <button
    className="square"
    onClick={onSquareClick}
  >
    {value}
  </button>

}


export default function Board() {
  const [squares, setSquares] = useState<Array<string>>(Array(9).fill(null));
  const [xIsnext, setXIsNext] = useState<boolean>(true)

  function handleClick(index: number) {
    if (squares[index]) return;

    const nextSquares = squares.slice();


    if (xIsnext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }

    calculateWinner(squares);
    setXIsNext(!xIsnext);
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="title">neto</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} ></Square>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} ></Square>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}></Square>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}></Square>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}></Square>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}></Square>
      </div>
    </>
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    
  }
}