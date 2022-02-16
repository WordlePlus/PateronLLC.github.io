import React, { useState } from 'react';
import BoardArea from './BoardArea';
import { wordList } from '../six-letter-words.js';

const Game = () => {
  const getNewWord = () => {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
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
