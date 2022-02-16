import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Slide, Typography, useTheme } from "@mui/material";
import LetterBox from './LetterBox.js';
import { wordList } from '../six-letter-words.js';

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
  const [gameOver, setGameOver] = useState(false);

	useEffect(() => {
		const deepClone = (items) =>
			items.map((item) => (Array.isArray(item) ? deepClone(item) : item));
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
			let newSquares = deepClone(squares);
			let newSquareColors = deepClone(squareColors);
			let newCurrSquare = deepClone(currSquare);
			console.log(key);

			switch (true) {
				case /^[A-Za-z]{1}$/g.test(key):
					key = key.toUpperCase();
					if (newCurrSquare[1] < squares[0].length) {
						newSquares[newCurrSquare[0]][newCurrSquare[1]] = key;
						newCurrSquare[1]++;
						setSquares(() => newSquares);
						setCurrSquare(() => newCurrSquare);
					}
					break;

				case key === 'Backspace' || key === 'Delete':
					if (newCurrSquare[1] === newSquares[0].length) {
						for (let idx in newSquareColors[newCurrSquare[0]]) {
							newSquareColors[newCurrSquare[0]][idx] = 'grey';
						}
						setSquareColors(() => newSquareColors);
					}
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
					const currGuess = newSquares[newCurrSquare[0]].join('');
					// Check word against wordlist, turn row red if not in list
					if (!wordList.includes(currGuess.toLowerCase())) {
						console.error('That word is not in our word list');
						for (let idx in newSquareColors[newCurrSquare[0]]) {
							newSquareColors[newCurrSquare[0]][idx] = 'red';
						}
						setSquareColors(() => newSquareColors);
					} else {
						// Cache letter frequency in finalWord
						const finalWordLetterCache = {};
						finalWord.split('').forEach((value, index) => {
							if (
								!Object.prototype.hasOwnProperty.call(
									finalWordLetterCache,
									value
								)
							)
								finalWordLetterCache[value] = 1;
							else {
								finalWordLetterCache[value]++;
							}
						});

						// Letter matches location, turn green
						newSquares[newCurrSquare[0]].forEach((square, squareIndex) => {
							if (
								Object.prototype.hasOwnProperty.call(
									finalWordLetterCache,
									square
								) &&
								square === finalWord[squareIndex]
							) {
								newSquareColors[newCurrSquare[0]][squareIndex] = 'green';
								finalWordLetterCache[square]--;
								// setSquareColors(() => newSquareColors);
							}
						});

						// Letter matches, but not location, turn orange
						newSquares[newCurrSquare[0]].forEach((square, squareIndex) => {
							if (
								Object.prototype.hasOwnProperty.call(
									finalWordLetterCache,
									square
								) &&
								finalWordLetterCache[square] > 0
							) {
								newSquareColors[newCurrSquare[0]][squareIndex] = 'yellow';
								finalWordLetterCache[square]--;
							}
						});
            
						setSquareColors(() => newSquareColors);

						//check to see if the row matches the final word
						if (currGuess === finalWord) {
							console.log(
								currGuess,
								'⭐You are a wizard.  You are a winner.  Here is 1 buttcoin⭐'
							);
              setGameOver(true);
							resetBoard();
						} else if (newCurrSquare[0] >= squares.length - 1) {
							console.log('This is what you are: loser LOSER loser');
              setGameOver(true);
							resetBoard();
						} else {
							newCurrSquare[0]++;
							newCurrSquare[1] = 0;
							setSquares(() => newSquares);
							setCurrSquare(() => newCurrSquare);
						}
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

	return <>
    <Dialog open={gameOver} onClose={() => setGameOver(false)}>
      <h1>dialog open!</h1>
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
  </>;
};

export default BoardArea;
