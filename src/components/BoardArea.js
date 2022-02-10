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
			if (e.key.match(/^[A-Za-z]{1}$/g)) {
				console.log('Keydown Event: ', e.key);
				
        setGameBoard((prevState) => {
					console.log('prevState squares: ', prevState.squares);
					prevState.squares[prevState.currentSquare[0]][
						prevState.currentSquare[1]
					] = e.key;

					if (prevState.currentSquare[1] % 6 === 5) {
            
						prevState.currentSquare = [prevState.currentSquare[0] + 1, 0];
					} else {
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
		};

		document.addEventListener('keydown', handleKeyDown);
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
