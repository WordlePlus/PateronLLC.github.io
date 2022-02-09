import React, { useState, useEffect } from 'react';
import LetterBox from './LetterBox.js';

const BoardArea = (props) => {
	const [squares, setSquares] = useState([[], [], [], [], [], [], []]);
	const [currentSquare, setCurrentSquare] = useState([0, 0]);

	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key.match(/^[A-Za-z]{1}$/g)) {
				console.log(e.key);
				setSquares(squares[currentSquare[0]][currentSquare[1]], e.key);
				if (currentSquare[1] % 6 === 5) {
					setCurrentSquare([currentSquare[0]++, 0]); //
				} else {
					setCurrentSquare([currentSquare[0], currentSquare[1]++]);
				}
				// } else if (e.key === 'Backspace') {
				// 					dispatch(removeLetter())
				// 			} else if (e.key === 'Enter') {
				// 					dispatch(makeGuess())
			}
			console.log(currentSquare);
		});
	}, []);

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
