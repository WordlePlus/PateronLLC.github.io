import React, { useState, useEffect } from 'react';
import LetterBox from './LetterBox.js';

const BoardArea = ({ setFinalWord, finalWord }) => {
  const [gameBoard, setGameBoard] = useState({
    squares: Array.from({ length: 2 }, (value, index) =>
      Array.from({ length: 6 }, (value1, index1) => ''),
    ),
    currentSquare: [0, 0],
  });
  const [test, setTest] = useState({ test: 'test' });
  console.log('finalWord in boardarea: ', finalWord);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    console.log('finalword in useEffect ', finalWord);

    function handleKeyDown({ key }) {
      setGameBoard((state) => {
        let newSquares = state.squares.slice();
        let newCurrSquare = state.currentSquare.slice();
        console.log('state' + JSON.stringify(state));

        if (key.match(/^[A-Za-z]{1}$/g)) {
          // console.log(newCurrSquare);
          if (newCurrSquare[1] < state.squares[0].length) {
            newSquares[newCurrSquare[0]][newCurrSquare[1]] = key;
            newCurrSquare[1]++;
          }
        } else if (key.match('Backspace' || 'Delete')) {
          if (newCurrSquare[1] !== 0) {
            newSquares[newCurrSquare[0]][newCurrSquare[1] - 1] = '';
            newCurrSquare[1]--;
          } else {
            console.log('hi, Cameron is right');
          }
        } else if (key.match('Enter' || 'Return') && newCurrSquare[1] === state.squares[0].length) {
          //	TODO - TEST IF ENDERED WORD MATCHES THE MAGIC WORD
          const rowWord = newSquares[newCurrSquare[0]].join('');
          console.log('finalWord in useEffect Enter/Return Push: ', finalWord);
          if (rowWord === finalWord) {
            console.log(rowWord, 'You are a wizard.  You are a winner.  Here is 1 buttcoin⭐');
          }
          if (newCurrSquare[0] >= state.squares.length - 1) {
            console.log('loser LOSER loser');
            setFinalWord();
            newSquares = Array.from({ length: 2 }, (value, index) =>
              Array.from({ length: 6 }, (value1, index1) => ''),
            );
            newCurrSquare = [0, 0];
          } else {
            newCurrSquare[0]++;
            newCurrSquare[1] = 0;
          }
        }

        return {
          squares: newSquares,
          currentSquare: newCurrSquare,
        };
      });
    }

    // clear event listener
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [finalWord, setFinalWord]);

  useEffect(() => {});

  const renderSquare = (char, key) => {
    return <LetterBox key={key} char={char} />;
  };

  return (
    <div className="board-area">
      <div>{finalWord}</div>
      {gameBoard.squares.map((rowArray, rowIndex) => {
        return (
          <div className="word-row" key={rowIndex}>
            {gameBoard.squares[rowIndex].map((char, col) => {
              const key = rowIndex.toString() + col.toString();
              return renderSquare(char, key);
            })}
          </div>
        );
      })}
    </div>
  );
};

export default BoardArea;
