import React, { useState, useEffect } from 'react';
import LetterBox from './LetterBox.js';

const BoardArea = (props) => {
  const [gameBoard, setGameBoard] = useState({
    squares: [[], [], [], [], [], [], []],
    currentSquare: [0, 0],
  });

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key.match(/^[A-Za-z]{1}$/g)) {
        console.log('Keydown Event: ', e.key);
        setGameBoard((prevState) => {
          console.log('Current squares: ', prevState.squares);
          prevState.squares[prevState.currentSquare[0]][prevState.currentSquare[1]] = e.key;

          if (prevState.currentSquare[1] % 6 === 5) {
            console.log('Changing current row', prevState.currentSquare[0] + 1);
            prevState.currentSquare = [prevState.currentSquare[0] + 1, 0];
          } else {
            console.log('Changing current column', prevState.currentSquare[1] + 1);
            prevState.currentSquare = [prevState.currentSquare[0], prevState.currentSquare[1] + 1];
          }
          // TODO: add logic here to handle when the 'squares' array is full.  currently throws error

          return prevState;
          // TODO: add logic for when a user presses backspace or enter

          // } else if (e.key === 'Backspace') {
          // 					dispatch(removeLetter())
          // 			} else if (e.key === 'Enter') {
          // 					dispatch(makeGuess())
        });
      }
    });
  }, [gameBoard]);

  const renderSquare = (char) => {
    return <LetterBox letter={char} onKeyPress={() => props.onClick()} />;
  };

  return (
    <div className="board-area">
      <div>{props.finalWord}</div>
      <div className="word-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
      </div>
      <div className="word-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
      </div>
      <div className="word-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
      </div>
      <div className="word-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
      </div>
      <div className="word-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
      </div>
      <div className="word-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
      </div>
      <div className="word-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
      </div>
    </div>
  );
};

export default BoardArea;
