import React, { useState } from 'react';
import BoardArea from './components/gameboard/BoardArea';
import { Keyboard } from './components/keyboard/Keyboard.js';
import { NUM_GUESSES, WORD_LENGTH } from './constants/settings';
import { setNewWord, finalWord } from './lib/solution'
import { WORDLIST } from './constants/wordlist';
import './App.css';

function App() {
	const [squares, setSquares] = useState(
		Array.from({ length: NUM_GUESSES }, (value, index) =>
			Array.from({ length: WORD_LENGTH }, (value1, index1) => '')
		)
	);
	const [squareColors, setSquareColors] = useState(
		Array.from({ length: NUM_GUESSES }, (value, index) =>
			Array.from({ length: WORD_LENGTH }, (value1, index1) => 'gray')
		)
	);
	const [currSquare, setCurrSquare] = useState([0, 0]);
	const [gameOver, setGameOver] = useState(false);
	const [won, setWon] = useState(false);

  const resetBoard = () => {
    const newSquares = Array.from({ length: NUM_GUESSES }, (value, index) =>
      Array.from({ length: WORD_LENGTH }, (value1, index1) => ''),
    );
    const newSquareColors = Array.from({ length: NUM_GUESSES }, (value, index) =>
      Array.from({ length: WORD_LENGTH }, (value1, index1) => 'gray'),
    );
    const newCurrSquare = [0, 0];
    setSquares(() => newSquares);
    setSquareColors(() => newSquareColors);
    setCurrSquare(() => newCurrSquare);
    setNewWord();
  };

  const deepClone = (items) =>
  items.map((item) => (Array.isArray(item) ? deepClone(item) : item));

  const onChar = (key) => {
    key = key.toUpperCase();
    if (currSquare[1] < squares[0].length) {
      setSquares((prevSquares) => {
        const newSquares = deepClone(prevSquares)
        newSquares[currSquare[0]][currSquare[1]] = key;
        return newSquares;
      });
      setCurrSquare((prevState) => {
        const newCurrSquare = deepClone(prevState)
        newCurrSquare[1]++;
        return newCurrSquare;
      })
    }
  }

  const onDelete = () => {
    if (currSquare[1] === squares[0].length) {
      setSquareColors((prevSquareColors) => {
        const newSquareColors = deepClone(prevSquareColors);
        for (let idx in newSquareColors[currSquare[0]]) {
          newSquareColors[currSquare[0]][idx] = 'grey';
        }
        return newSquareColors;
      });
    }
    if (currSquare[1] !== 0) {
      setSquares((prevSquares) => {
        const newSquares = deepClone(prevSquares)
        newSquares[currSquare[0]][currSquare[1] - 1] = '';
        return newSquares;
      });
      setCurrSquare((prevCurrSquare) => {
        const newCurrSquare = deepClone(currSquare);
        newCurrSquare[1]--;
        return newCurrSquare;
      });
    } else {
      console.log('Hi, Sully is demonic. Cameron = ANUSES');
    }
  }

  const onEnter = () => {
    let usedWord = false;
    const currGuess = squares[currSquare[0]].join('');
    const newSquareColors = deepClone(squareColors);

          //Check if guess has already been made
          for (let idx = 0; idx < currSquare[0]; idx++) {
            const wordJoin = squares[idx].join('');
            console.log(wordJoin, currGuess);
            if (wordJoin === currGuess) {
              usedWord = true;
            }
          }

          // Check word against WORDLIST, turn row red if not in list
          if (!WORDLIST.includes(currGuess.toLowerCase()) || usedWord) {
            console.error(`Sorry, ${currGuess} is not in our word list or word has been used already.`);
              for (let idx in newSquareColors[currSquare[0]]) {
                newSquareColors[currSquare[0]][idx] = 'red';
              }
              setSquareColors(newSquareColors);
          } else {
            // Cache letter frequency in finalWord
            const finalWordLetterCache = {};
            finalWord.split('').forEach((value, index) => {
              if (!Object.prototype.hasOwnProperty.call(finalWordLetterCache, value))
                finalWordLetterCache[value] = 1;
              else {
                finalWordLetterCache[value]++;
              }
            });

            // Letter matches location, turn green
            squares[currSquare[0]].forEach((square, squareIndex) => {
              if (
                Object.prototype.hasOwnProperty.call(finalWordLetterCache, square)
                && square === finalWord[squareIndex]
              ) {
                newSquareColors[currSquare[0]][squareIndex] = 'green';
                finalWordLetterCache[square]--;
              }
            });

            // Letter matches, but not location, turn yellow
            squares[currSquare[0]].forEach((square, squareIndex) => {
              if (
                Object.prototype.hasOwnProperty.call(finalWordLetterCache, square)
                && finalWordLetterCache[square] > 0
                && newSquareColors[currSquare[0]][squareIndex] !== 'green'
              ) {
                newSquareColors[currSquare[0]][squareIndex] = 'yellow';
                finalWordLetterCache[square]--;
              }
            });

            setSquareColors(newSquareColors);

            //check to see if the row matches the final word
            if (currGuess === finalWord) {
              console.log(
                currGuess,
                '⭐You are a wizard.  You are a winner.  Here is 1 buttcoin⭐',
              );
              setWon(true);
              setGameOver(true);
            } else if (currSquare[0] >= squares.length - 1) {
              console.log('This is what you are: loser LOSER loser');
              setWon(false);
              setGameOver(true);
            } else {
              setCurrSquare(() => {
                const newCurrSquare = deepClone(currSquare);
                newCurrSquare[0]++;
                newCurrSquare[1] = 0;
                return newCurrSquare;
              });
            }
          }
  }
  
	return (
		<div className="App">
			<header className="App-header">
				<h2>Wordle-Plus</h2>
				<BoardArea
					finalWord={finalWord}
					setNewWord={setNewWord}
					squares={squares}
					setSquares={setSquares}
					squareColors={squareColors}
					setSquareColors={setSquareColors}
					currSquare={currSquare}
					setCurrSquare={setCurrSquare}
					gameOver={gameOver}
					setGameOver={setGameOver}
					won={won}
					setWon={setWon}
          resetBoard={resetBoard}
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
				/>
				<Keyboard />
			</header>
		</div>
	);
}

export default App;
