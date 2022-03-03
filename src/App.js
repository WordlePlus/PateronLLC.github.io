import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import BoardArea from './components/gameboard/BoardArea';
import { Keyboard } from './components/keyboard/Keyboard.js';
import { NUM_GUESSES, WORD_LENGTH } from './constants/settings';
import { setNewWord, finalWord } from './lib/solution';
import { WORDLIST } from './constants/wordlist';
import './App.css';

function App() {
  const [squares, setSquares] = useState(
    Array.from({ length: NUM_GUESSES }, (value, index) =>
      Array.from({ length: WORD_LENGTH }, (value1, index1) => ''),
    ),
  );
  const [squareColors, setSquareColors] = useState(
    Array.from({ length: NUM_GUESSES }, (value, index) =>
      Array.from({ length: WORD_LENGTH }, (value1, index1) => 'lightgray'),
    ),
  );
  const [currSquare, setCurrSquare] = useState([0, 0]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [colorKeyboard, setColorKeyboard] = useState({});

  const resetBoard = () => {
    const newSquares = Array.from({ length: NUM_GUESSES }, (value, index) =>
    Array.from({ length: WORD_LENGTH }, (value1, index1) => ''),
    );
    const newSquareColors = Array.from({ length: NUM_GUESSES }, (value, index) =>
    Array.from({ length: WORD_LENGTH }, (value1, index1) => 'lightgray'),
    );
    const newCurrSquare = [0, 0];
    setGameOver(false);
    new Promise((resolve) => setTimeout(resolve, 300), (reject) => console.error(reject)).then(()=>{
      setSquares(newSquares);
      setSquareColors(newSquareColors);
      setCurrSquare(newCurrSquare);
      setNewWord();
      setColorKeyboard({});
    })
  };

  const deepClone = (input) => {
    if (typeof input !== 'object' || input === null) {
      return input;
    }
    const output = Array.isArray(input) ? [] : {};
    for (let key in input) {
      let value = input[key];
      output[key] = deepClone(value);
    }
    return output;
  };

  const onChar = (key) => {
    key = key.toUpperCase();
    if (currSquare[1] < squares[0].length) {
      const newSquares = deepClone(squares);
      const newCurrSquare = deepClone(currSquare);
      newSquares[currSquare[0]][currSquare[1]] = key;
      newCurrSquare[1]++;

      setSquares(newSquares);
      setCurrSquare(newCurrSquare);
    }
  };

  const onDelete = () => {
    if (currSquare[1] === squares[0].length) {
      setSquareColors((prevSquareColors) => {
        const newSquareColors = deepClone(prevSquareColors);
        for (let idx in newSquareColors[currSquare[0]]) {
          newSquareColors[currSquare[0]][idx] = 'lightgray';
        }
        return newSquareColors;
      });
    }
    if (currSquare[1] !== 0) {
      setSquares((prevSquares) => {
        const newSquares = deepClone(prevSquares);
        newSquares[currSquare[0]][currSquare[1] - 1] = '';
        return newSquares;
      });
      setCurrSquare((prevCurrSquare) => {
        const newCurrSquare = deepClone(prevCurrSquare);
        newCurrSquare[1]--;
        return newCurrSquare;
      });
    } else {
      console.error('You cannot delete until you have characters entered');
    }
  };

  const onEnter = () => {
    let usedWord = false;
    const currGuess = squares[currSquare[0]].join('');
    const newSquareColors = deepClone(squareColors);
    const newColorKeyboard = deepClone(colorKeyboard);

    //Check if guess has already been made
    for (let idx = 0; idx < currSquare[0]; idx++) {
      const wordJoin = squares[idx].join('');
      if (wordJoin === currGuess) {
        usedWord = true;
      }
    }

    // Check word against WORDLIST, turn row red if not in list
    if (!WORDLIST.includes(currGuess.toLowerCase()) || usedWord) {
      for (let idx in newSquareColors[currSquare[0]]) {
        newSquareColors[currSquare[0]][idx] = 'red';
      }
      setSquareColors(newSquareColors);
      console.log(`Sorry, ${currGuess} is not in our word list or word has been used already.`);
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
          newColorKeyboard[square] = 'green';
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
          if (newColorKeyboard[square] !== 'green') newColorKeyboard[square] = 'yellow';
        }
      });

      // Letter doesn't match any letter in solution or cache is empty, turn dark gray
      squares[currSquare[0]].forEach((square, squareIndex) => {
        if (
          !Object.prototype.hasOwnProperty.call(finalWordLetterCache, square)
          || (finalWordLetterCache[square] === 0
            && newSquareColors[currSquare[0]][squareIndex] === 'lightgray')
        ) {
          newSquareColors[currSquare[0]][squareIndex] = 'gray';
          if (newColorKeyboard[square] !== 'green' && newColorKeyboard[square] !== 'yellow')
            newColorKeyboard[square] = 'gray';
        }
      });

      setSquareColors(newSquareColors);
      setColorKeyboard(newColorKeyboard);

      //check to see if the row matches the final word
      if (currGuess === finalWord) {
        setWon(true);
        setGameOver(true);
      } else if (currSquare[0] >= squares.length - 1) {
        setWon(false);
        setGameOver(true);
      } else {
        setCurrSquare((prevCurrSquare) => {
          const newCurrSquare = deepClone(prevCurrSquare);
          newCurrSquare[0]++;
          newCurrSquare[1] = 0;
          return newCurrSquare;
        });
      }
    }
  };

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          Wordle Plus
        </Typography>

        <BoardArea
          finalWord={finalWord}
          squares={squares}
          squareColors={squareColors}
          currSquare={currSquare}
          gameOver={gameOver}
          setGameOver={setGameOver}
          won={won}
          resetBoard={resetBoard}
        />
        <Keyboard
          finalWord={finalWord}
          squares={squares}
          setSquares={setSquares}
          squareColors={squareColors}
          setSquareColors={setSquareColors}
          currSquare={currSquare}
          setCurrSquare={setCurrSquare}
          gameOver={gameOver}
          setGameOver={setGameOver}
          setWon={setWon}
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          colorKeyboard={colorKeyboard}
          resetBoard={resetBoard}
        />
      </Container>
    </div>
  );
}

export default App;
