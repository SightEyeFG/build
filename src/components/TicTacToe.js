import React, { useState } from 'react';

// The calculateWinner function should be defined before it is used in the component
const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const TicTacToe = () => {
  const [history, setHistory] = useState([{ board: Array(9).fill(null), isXNext: true }]);
  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];
  const winner = calculateWinner(current.board);

  const handleClick = (index) => {
    if (current.board[index] || winner) return;

    const newBoard = current.board.slice();
    newBoard[index] = current.isXNext ? 'X' : 'O';
    const newHistory = history.slice(0, currentMove + 1).concat([{ board: newBoard, isXNext: !current.isXNext }]);

    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
  };

  return (
    <div>
      <h1>Tic Tac Toe Game</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '150px' }}>
        {current.board.map((cell, index) => (
          <div
            key={index}
            style={{
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid black',
              cursor: 'pointer',
              fontSize: '24px'
            }}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && <h2>Winner: {winner}</h2>}
      <button onClick={() => {
        setHistory([{ board: Array(9).fill(null), isXNext: true }]);
        setCurrentMove(0);
      }}>Reset Game</button>
      <div>
        <h3>History</h3>
        <ul>
          {history.map((step, move) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>
                {move ? `Go to move #${move}` : 'Go to game start'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicTacToe;
