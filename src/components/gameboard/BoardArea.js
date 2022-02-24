import React from 'react';
import {
	Box,
	Grid,
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
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
				<DialogTitle>{won ? 'You won! 🎈' : 'You lost! 😔'}</DialogTitle>
				<DialogContent className="dialog-content">
					<DialogContentText className="dialogtext">
						{won
							? `You guessed the word in ${currSquare[0] + 1} guess${
									currSquare[0] === 0 ? '' : 'es'
							  }!`
							: `The solution was ${finalWord}.\nBetter luck next time.`}
					</DialogContentText>
					<Button
						onClick={() => {
							resetBoard();
							setGameOver(false);
						}}
						variant="contained"
						className="dialogtext"
					>
						Start a new Game!
					</Button>
				</DialogContent>
			</Dialog>

			<Box
				sx={{
					paddingBottom: '15px',
					display: 'flex',
					flexDirection: 'column',
          justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{squares.map((rowArray, rowIndex) => {
					return (
						<Grid
							container
							key={`row-container-${rowIndex}`}
							sx={{
								width: 'min(90vw, 522px)',
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{rowArray.map((char, colIndex) => {
								const key = rowIndex.toString() + colIndex.toString();
								return renderSquare(
									char,
									key,
									squareColors[rowIndex][colIndex]
								);
							})}
						</Grid>
					);
				})}
			</Box>
		</>
	);
};

export default BoardArea;
