import React, { useEffect } from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import LetterBox from './LetterBox.js';

const BoardArea = ({ setNewWord, finalWord, squares, setSquares, squareColors, setSquareColors, currSquare, setCurrSquare, gameOver, setGameOver, won, setWon, resetBoard, onChar, onDelete, onEnter }) => {

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    function handleKeyUp({ key }) {
      console.log(key);
      switch (true) {
        case /^[A-Za-z]{1}$/g.test(key):
          onChar(key);
          break;

        case key === 'Backspace' || key === 'Delete':
          onDelete();
          break;

        case (key === 'Enter' || key === 'Return') && currSquare[1] >= squares[0].length:
          onEnter();
          break;

        default:
          console.log("Key down event didn't match");
      }
    }

    // clear event listener
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [finalWord, currSquare, squares, squareColors, setWon, setCurrSquare, setGameOver, setSquareColors, setSquares, onChar, onDelete, onEnter]);

  const renderSquare = (char, key, color) => {
    return <LetterBox key={key} char={char} color={color} />;
  };

  return (
    <>
      <Dialog
        open={gameOver}
        onClose={() => {
          resetBoard();
          setGameOver(false);
        }}
      >
        <DialogTitle>{won ? 'You won! 🎈' : 'You lost! 🤢😔🤢'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {won
              ? `You guessed the word in ${currSquare[0] + 1} guess${
                  currSquare[0] === 0 ? '' : 'es'
                }!`
              : 'Your caboose is loose.'}
          </DialogContentText>
          <Button
            onClick={() => {
              resetBoard();
              setGameOver(false);
            }}
          >
            Start a new Game!
          </Button>
        </DialogContent>
      </Dialog>

      <div className="board-area">
        <div>{finalWord}</div>
        {squares.map((rowArray, rowIndex) => {
          return (
            <div className="word-row" key={rowIndex}>
              {rowArray.map((char, colIndex) => {
                const key = rowIndex.toString() + colIndex.toString();
                return renderSquare(char, key, squareColors[rowIndex][colIndex]);
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BoardArea;
