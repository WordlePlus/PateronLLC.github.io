import React from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import LetterBox from './LetterBox.js';

const BoardArea = ({
  finalWord,
  squares,
  squareColors,
  currSquare,
  gameOver,
  setGameOver,
  won,
  resetBoard,
}) => {
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
              : 'Better luck next time.'}
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
