import react, { useState, useEffect } from 'react';
import BoardArea from './BoardArea';
import { wordList } from '../six-letter-words.js';

const Game = () => {
	const [finalWord, setFinalWord] = useState();

	useEffect(() => {
		getWord();
	}, []);

	const getWord = () => {
		const word = wordList[Math.floor(Math.random() * wordList.length)];
		setFinalWord(word);
	};

	return <BoardArea finalWord={finalWord} />;
};

export default Game;
