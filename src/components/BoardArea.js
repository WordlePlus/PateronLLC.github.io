import React, { useState, useEffect } from 'react';
import LetterBox from './LetterBox.js';

const BoardArea = ({ setFinalWord, finalWord }) => {
  const [squares, setSquares] = useState(
    Array.from({ length: 2 }, (value, index) => Array.from({ length: 6 }, (value1, index1) => '')),
  );
  const [squareColor, setSquareColor] = useState(
    Array.from({ length: 2 }, (value, index) =>
      Array.from({ length: 6 }, (value1, index1) => 'gray'),
    ),
  );
  const [currSquare, setCurrSquare] = useState([0, 0]);

  console.log('finalWord in boardarea: ', finalWord);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    function handleKeyDown({ key }) {
      let newSquares = squares.slice();
      let newCurrSquare = currSquare.slice();
      console.log({ key });

      switch (true) {
        case /^[A-Za-z]{1}$/g.test(key):
          if (newCurrSquare[1] < squares[0].length) {
            newSquares[newCurrSquare[0]][newCurrSquare[1]] = key;

            newCurrSquare[1]++;
          }
          break;

        case key === 'Backspace' || key === 'Delete':
          if (newCurrSquare[1] !== 0) {
            newSquares[newCurrSquare[0]][newCurrSquare[1] - 1] = '';
            newCurrSquare[1]--;
          } else {
            console.log('hi, Cameron is right');
          }
          break;

        case (key === 'Enter' || key === 'Return') && currSquare[1] === squares[0].length:
          // color changing logic here?
          newSquares[newCurrSquare[0]].forEach((square, squareIndex) => {
            if (square === finalWord[squareIndex]) {
              setSquareColor((state) => {
                let newColors = state.slice();
                console.log(newColors);
                newColors[newCurrSquare[0]][squareIndex] = 'green';
                return newColors;
              });
            }
          });

          const rowWord = newSquares[newCurrSquare[0]].join('');
          if (rowWord === finalWord) {
            console.log(rowWord, 'You are a wizard.  You are a winner.  Here is 1 buttcoin⭐');
            setFinalWord();
            newSquares = Array.from({ length: 2 }, (value, index) =>
              Array.from({ length: 6 }, (value1, index1) => ''),
            );
            newCurrSquare = [0, 0];
          } else if (newCurrSquare[0] >= squares.length - 1) {
            console.log('This is what you are: loser LOSER loser');
            setFinalWord();
            newSquares = Array.from({ length: 2 }, (value, index) =>
              Array.from({ length: 6 }, (value1, index1) => ''),
            );
            newCurrSquare = [0, 0];
          } else {
            newCurrSquare[0]++;
            newCurrSquare[1] = 0;
          }
          break;
        default:
          console.log("Key down event didn't match");
      }
      console.log('squarecolor', squareColor);
      setSquares(() => newSquares);
      setCurrSquare(() => newCurrSquare);
    }

    // clear event listener
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [finalWord, setFinalWord, currSquare, squares]);

  const renderSquare = (char, key, color) => {
    return <LetterBox key={key} char={char} color={color} />;
  };

  return (
    <div className="board-area">
      <div>{finalWord}</div>
      {squares.map((rowArray, rowIndex) => {
        return (
          <div className="word-row" key={rowIndex}>
            {rowArray.map((char, colIndex) => {
              const key = rowIndex.toString() + colIndex.toString();
              return renderSquare(char, key, squareColor[rowIndex][colIndex]);
            })}
          </div>
        );
      })}
    </div>
  );
};

export default BoardArea;
