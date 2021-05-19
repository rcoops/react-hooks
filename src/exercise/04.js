// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'


function Board({ squares, onClick }) {

  const renderSquare = React.useCallback((i) => (
    <button className="square" onClick={() => onClick(i)}>
      {squares[i]}
    </button>
  ), [squares, onClick]);

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [squares, setSquares] = React.useState(() => {
    const locallyStoredSquares = window.localStorage.getItem('squares')
    return locallyStoredSquares ? JSON.parse(locallyStoredSquares) : Array(9).fill(null)
  });

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  const updateLocalStorage = React.useCallback((newSquares) => {
    window.localStorage.setItem('squares', JSON.stringify(newSquares));
  }, []);

  const updateSquares = React.useCallback((newSquares) => {
    if (newSquares !== squares) {
      setSquares(newSquares);
      updateLocalStorage(newSquares);
    }
  }, [squares, setSquares, updateLocalStorage])

  const selectSquare = React.useCallback((square) => {
    if (winner || squares[square]) {
      return
    }
    const newSquares = [...squares]
    newSquares[square] = nextValue
    updateSquares(newSquares)
  }, [updateSquares, squares, winner, nextValue]);

  const restart = React.useCallback(() => {
    updateSquares(Array(9).fill(null))
  }, [updateSquares]);

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={squares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        {/* <ol>{moves}</ol> */}
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
