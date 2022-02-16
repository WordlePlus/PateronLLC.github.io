import React, { useState, useEffect } from 'react';
import LetterBox from './LetterBox.js';

const BoardArea = ({ setFinalWord, finalWord }) => {
	// TODO: What if we used a single matrix to track squares, and properties associated with each square?  I.e. combine squares array and colors array
	const [squares, setSquares] = useState(
		Array.from({ length: 2 }, (value, index) =>
			Array.from({ length: 6 }, (value1, index1) => '')
		)
	);
	const [squareColors, setSquareColors] = useState(
		Array.from({ length: 2 }, (value, index) =>
			Array.from({ length: 6 }, (value1, index1) => 'gray')
		)
	);
	const [currSquare, setCurrSquare] = useState([0, 0]);

	useEffect(() => {
		const resetBoard = () => {
			const newSquares = Array.from({ length: 2 }, (value, index) =>
				Array.from({ length: 6 }, (value1, index1) => '')
			);
			const newSquareColors = Array.from({ length: 2 }, (value, index) =>
				Array.from({ length: 6 }, (value1, index1) => 'gray')
			);
			const newCurrSquare = [0, 0];
			setSquares(() => newSquares);
			setSquareColors(() => newSquareColors);
			setCurrSquare(() => newCurrSquare);
			setFinalWord();
		};

		document.addEventListener('keydown', handleKeyDown);

		function handleKeyDown({ key }) {
			let newSquares = squares.slice();
			let newCurrSquare = currSquare.slice();
			console.log(key);

			switch (true) {
				case /^[A-Za-z]{1}$/g.test(key):
					if (newCurrSquare[1] < squares[0].length) {
						newSquares[newCurrSquare[0]][newCurrSquare[1]] = key;
						newCurrSquare[1]++;
						setSquares(() => newSquares);
						setCurrSquare(() => newCurrSquare);
					}
					break;

				case key === 'Backspace' || key === 'Delete':
					if (newCurrSquare[1] !== 0) {
						newSquares[newCurrSquare[0]][newCurrSquare[1] - 1] = '';
						newCurrSquare[1]--;
						setSquares(() => newSquares);
						setCurrSquare(() => newCurrSquare);
					} else {
						console.log('hi, Cameron is right');
					}
					break;

				case (key === 'Enter' || key === 'Return') &&
					currSquare[1] === squares[0].length:
					const finalWordLetterCache = {};
					finalWord.split('').forEach((value, index) => {
						if (!finalWordLetterCache.hasOwnProperty(value))
							finalWordLetterCache[value] = 1;
						else {
							finalWordLetterCache[value]++;
						}
					});

					console.log(finalWordLetterCache);

					// Letter matches location, turn green
					newSquares[newCurrSquare[0]].forEach((square, squareIndex) => {
						if (
							finalWordLetterCache.hasOwnProperty(square) &&
							square === finalWord[squareIndex]
						) {
							setSquareColors((state) => {
								let newColors = state.slice();
								newColors[newCurrSquare[0]][squareIndex] = 'green';
								return newColors;
							});
							finalWordLetterCache[square]--;
						}
					});

					// Letter matches, but not location, turn orange
					newSquares[newCurrSquare[0]].forEach((square, squareIndex) => {
						if (
							finalWordLetterCache.hasOwnProperty(square) &&
							finalWordLetterCache[square] > 0
						) {
							setSquareColors((state) => {
								let newColors = state.slice();
								newColors[newCurrSquare[0]][squareIndex] = 'yellow';
								return newColors;
							});
							finalWordLetterCache[square]--;
						}
					});

					//check to see if the row matches the final word
					const rowWord = newSquares[newCurrSquare[0]].join('');
					if (rowWord === finalWord) {
						console.log(
							rowWord,
							'You are a wizard.  You are a winner.  Here is 1 buttcoin⭐'
						);
						resetBoard();
					} else if (newCurrSquare[0] >= squares.length - 1) {
						console.log('This is what you are: loser LOSER loser');
						resetBoard();
					} else {
						newCurrSquare[0]++;
						newCurrSquare[1] = 0;
						setSquares(() => newSquares);
						setCurrSquare(() => newCurrSquare);
					}
					break;

				default:
					console.log("Key down event didn't match");
			}
		}

		// clear event listener
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [finalWord, setFinalWord, currSquare, squares, squareColors]);

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
							return renderSquare(char, key, squareColors[rowIndex][colIndex]);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default BoardArea;
