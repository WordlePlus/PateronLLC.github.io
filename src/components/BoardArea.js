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
			const newSquares = gameBoard.squares;
			const newCurrSquare = gameBoard.currentSquare;
			console.log('Keydown Event: ', e.key);
			
			if (e.key.match(/^[A-Za-z]{1}$/g)) {
				if (newCurrSquare[1] !== 5) {
					//If we aren't at end of row, add key to state and increment currentSquare.
					newSquares[newCurrSquare[0]][newCurrSquare[1]] = e.key;
					newCurrSquare[1]++;
				} else {
					//If we ARE at end of row, add key to end row state and persist currentSquare.
					newSquares[newCurrSquare[0]][newCurrSquare[1]] = e.key;
				}

			} else if(e.key.match('Backspace'||'Delete') && newCurrSquare[1] !== 0) {
				//update state values in separate variables so that they can be passed to setGameBoard.
				newSquares[newCurrSquare[0]][newCurrSquare[1]] = '';
				newCurrSquare[1]--;

			} else if(e.key.match('Enter'||'Return') && newCurrSquare[1] === 5 && newSquares[newCurrSquare[0]][newCurrSquare[1]] !== ''){
				if(gameBoard.currentSquare[0] !== 6)
				newCurrSquare[0]++;
				newCurrSquare[1] = 0;
			};

			//update state
			setGameBoard(prevState => ({
				squares: newSquares,
				currentSquare: newCurrSquare,
			}));
		}
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
