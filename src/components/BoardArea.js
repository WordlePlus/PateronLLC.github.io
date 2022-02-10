import React, { useState, useEffect } from 'react';
import LetterBox from './LetterBox.js';

const BoardArea = (props) => {
	const [gameBoard, setGameBoard] = useState({
		squares: [
      Array(6).fill(''), 
      Array(6).fill(''),
      Array(6).fill(''),
      Array(6).fill(''),
      Array(6).fill(''),
      Array(6).fill(''),
      Array(6).fill('')],
		currentSquare: [0, 0],
	});

	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key.match(/^[A-Za-z]{1}$/g)) {
				console.log('Keydown Event: ', e.key);
				console.log(gameBoard.squares[gameBoard.currentSquare[0][0]]);
				setGameBoard((prevState) => {
					console.log('Current squares: ', prevState.squares);
					prevState.squares[prevState.currentSquare[0]][
						prevState.currentSquare[1]
					] = e.key;

					if (prevState.currentSquare[1] % 6 === 5) {
						console.log('Changing current row', prevState.currentSquare[0] + 1);
						prevState.currentSquare = [prevState.currentSquare[0] + 1, 0];
					} else {
						console.log(
							'Changing current column',
							prevState.currentSquare[1] + 1
						);
						prevState.currentSquare = [
							prevState.currentSquare[0],
							prevState.currentSquare[1] + 1,
						];
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
		return <LetterBox key={Math.floor(Math.random()*10000)} letter={char} />;
	};

	return (
		<div className="board-area">
			<div>{props.finalWord}</div>
			<div className="word-row">
				{gameBoard.squares[0].map((char) => {
					return renderSquare(char);
				})}
			</div>
			<div className="word-row">
        {gameBoard.squares[1].map((char) => {
					return renderSquare(char);
				})}
			</div>
			<div className="word-row">
        {gameBoard.squares[2].map((char) => {
					return renderSquare(char);
				})}
			</div>
			<div className="word-row">
        {gameBoard.squares[0].map((char) => {
					return renderSquare(char);
				})}
			</div>
			<div className="word-row">
        {gameBoard.squares[0].map((char) => {
					return renderSquare(char);
				})}
			</div>
			<div className="word-row">
        {gameBoard.squares[0].map((char) => {
					return renderSquare(char);
				})}
			</div>
			<div className="word-row">
        {gameBoard.squares[0].map((char) => {
					return renderSquare(char);
				})}
			</div>
		</div>
	);
};

export default BoardArea;
