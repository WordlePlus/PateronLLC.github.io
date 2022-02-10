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
			Array(6).fill(''),
		],
		currentSquare: [0, 0],
	});

	useEffect(() => {
		function handleKeyDown (e) {
			if (e.key.match(/^[A-Za-z]{1}$/g) && gameBoard.currentSquare != [6,5]) {
				console.log('Keydown Event: ', e.key);
				if (gameBoard.currentSquare[1] % 6 !== 5) {
				//update state values in separate variables so that they can be passed to setGameBoard.
				const newSquares = gameBoard.squares;
				const newCurrSquare = gameBoard.currentSquare;

				newSquares[newCurrSquare[0]][newCurrSquare[1]] = e.key;
				newCurrSquare[1]++;
				console.log('prevState squares: ', gameBoard.squares);

        setGameBoard(prevState => ({
					squares: newSquares,
					currentSquare: newCurrSquare,
				}));
			}
			} else {
					// TODO: add logic for when a user presses backspace or enter				
					// } else if (e.key === 'Backspace') {
					// 					dispatch(removeLetter())
					// 			} else if (e.key === 'Enter') {
					// 					dispatch(makeGuess())
			}

		};
	
		document.addEventListener('keydown', handleKeyDown);
		// return document.removeEventListener('keydown', handleKeyDown);
	}, []);

	const renderSquare = (char, key) => {
		return <LetterBox key={key} char={char} />;
	};

	return (
		<div className="board-area">
			<div>{props.finalWord}</div>
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
