import React, { useState, useEffect } from 'react';
import BoardArea from './BoardArea';
import { wordList } from '../six-letter-words.js';

const Game = () => {
	const [finalWord, setFinalWord] = useState();

	const getNewWord = () => {
		const word = wordList[Math.floor(Math.random() * wordList.length)];
		console.log('The secret word is: ', word);
		return word;
	};

	useEffect(() => {
		setFinalWord(getNewWord());
	}, []);

	return <BoardArea finalWord={finalWord} getNewWord={setFinalWord} />;
};

export default Game;
