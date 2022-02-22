import { WORDLIST } from '../constants/wordlist';

const getNewWord = () => {
	const word =
		WORDLIST[Math.floor(Math.random() * WORDLIST.length)].toUpperCase();
	console.log('The secret word in App component is: ', word);
	return word;
};

export let finalWord = getNewWord();

export const setNewWord = () => {
	finalWord = getNewWord();
};
