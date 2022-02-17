import React, { useState } from 'react';
import BoardArea from './BoardArea';
import { WORDLIST } from '../constants/wordlist.js';

const Game = () => {
  const getNewWord = () => {
    const word = WORDLIST[Math.floor(Math.random() * WORDLIST.length)].toUpperCase();
    console.log('The secret word in Game component is: ', word);
    return word;
  };

  const [finalWord, setFinalWord] = useState(getNewWord());

  const setNewWord = () => {
    setFinalWord(getNewWord());
  };

  return finalWord ? <BoardArea finalWord={finalWord} setFinalWord={setNewWord} /> : 'Getting word';
};

export default Game;
