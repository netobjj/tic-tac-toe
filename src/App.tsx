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

function Board({ xIsNext, squares, onPlay }: { xIsNext: boolean, squares: Array<string>, onPlay: Function }) {
  function handleClick(index: number) {
    if (squares[index]) return;
    if (winner) return alert(winner + " já venceu!");

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Vencedor: " + winner;
  } else {
    status = "Próximo jogador: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="container main">
      <div className="status">{status}</div>
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
      {winner ? (<button onClick={() => location.reload()} className="btn-reset">Reiniciar</button>) : ""}
    </div>
  );

  function calculateWinner(squares : string[]) {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }

    }

    return null;
  }
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [history, setHistory] = useState<Array<string[]>>([Array(9).fill(null)]);
  const [currentIMove, setCurrentIMove] = useState<number>(0);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: Array<string>) {
    const nextHistory = [...history.slice(0, currentIMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentIMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove: number) {
    setCurrentIMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, iMove) => {
    let description;
    if (iMove > 0) {
      description = "Go to move #" + iMove;
    } else {
      description = "Go to game start";
    }

    if(!squares && iMove !== 0) return

    
    return (
      <li key={iMove}>
        <button onClick={() => jumpTo(iMove)}>{description}</button>
      </li>
    );

  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>


    </div>
  );
}