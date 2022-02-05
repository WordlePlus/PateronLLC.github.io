import React, { useState, useEffect } from 'react';
import LetterBox from './LetterBox.js';

const BoardArea = (props) => {
	const [squares, setSquares] = useState([]);

	const renderSquare = (i) => {
		return <LetterBox letter={i} onClick={() => props.onClick(i)} />;
	};

	return (
		<div className="board-area">
      <div>{props.finalWord}</div>
			<div className="word-row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className="word-row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
				{renderSquare(9)}
				{renderSquare(10)}
				{renderSquare(11)}
			</div>
			<div className="word-row">
				{renderSquare(12)}
				{renderSquare(13)}
				{renderSquare(14)}
				{renderSquare(15)}
				{renderSquare(16)}
				{renderSquare(17)}
			</div>
			<div className="word-row">
				{renderSquare(18)}
				{renderSquare(19)}
				{renderSquare(20)}
				{renderSquare(21)}
				{renderSquare(22)}
				{renderSquare(23)}
			</div>
			<div className="word-row">
				{renderSquare(24)}
				{renderSquare(25)}
				{renderSquare(26)}
				{renderSquare(27)}
				{renderSquare(28)}
				{renderSquare(29)}
			</div>
			<div className="word-row">
				{renderSquare(30)}
				{renderSquare(31)}
				{renderSquare(32)}
				{renderSquare(33)}
				{renderSquare(34)}
				{renderSquare(35)}
			</div>
			<div className="word-row">
				{renderSquare(36)}
				{renderSquare(37)}
				{renderSquare(38)}
				{renderSquare(39)}
				{renderSquare(40)}
				{renderSquare(41)}
			</div>
		</div>
	);
};

export default BoardArea;
