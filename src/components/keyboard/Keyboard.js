import { Key } from './Key';
import { useEffect } from 'react';
import { Grid, Box } from '@mui/material';

export const Keyboard = ({
  finalWord,
  squares,
  setSquares,
  squareColors,
  setSquareColors,
  currSquare,
  setCurrSquare,
  gameOver,
  setWon,
  onChar,
  onDelete,
  onEnter,
  colorKeyboard,
  resetBoard,
}) => {
  const onClick = (value) => {
    console.log(value);
    if (value === 'Enter' && currSquare[1] >= squares[0].length) {
      onEnter();
    } else if (value === 'Delete') {
      onDelete();
    } else if (value.length === 1 && value >= 'A' && value <= 'Z') {
      onChar(value);
    } else {
      if (!currSquare[1] >= squares[0].length) {
        console.error('Exceeded character limit');
      } else {
        console.error(`Please complete row with ${squares[0].length} letters`);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    function handleKeyUp({ key }) {
      switch (true) {
        case key === 'Backspace' || (key === 'Delete' && !gameOver):
          onDelete();
          break;

        case (key === 'Enter' || key === 'Return') && currSquare[1] >= squares[0].length:
          if (gameOver) {
            resetBoard();
          } else onEnter();
          break;

        case key.length === 1 && key.toUpperCase() >= 'A' && key.toUpperCase() <= 'Z':
          onChar(key);
          break;

        default:
          console.error("Key down event didn't match a letter, enter, or backspace.");
      }
    }
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [
    finalWord,
    currSquare,
    squares,
    squareColors,
    setWon,
    setCurrSquare,
    setSquareColors,
    setSquares,
    onChar,
    onDelete,
    onEnter,
    gameOver,
    resetBoard,
  ]);

  return (
    <Box sx={{ display:'flex', flexDirection:"column", justifyContent:'center', alignItems:'center'}}>
      <Grid container spacing={1} sx={{maxWidth:'510px', margin:'6px', display:'flex', justifyContent:'space-around'}}>
        <Key width={40} value="Delete" onClick={onClick} colorKeyboardValue="rgb(226, 232, 240)">
          Delete
        </Key>
        <Key width={40} value="Enter" onClick={onClick} colorKeyboardValue="rgb(226, 232, 240)">
          Enter
        </Key>
      </Grid>
      <Grid container spacing={1} sx={{maxWidth:'510px', margin:'6px', display:'flex', justifyContent:'space-between'}}>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            colorKeyboardValue={
              Object.prototype.hasOwnProperty.call(colorKeyboard, key) ? colorKeyboard[key] : 'rgb(226, 232, 240)'
            }
          />
        ))}
      </Grid>
      <Grid container spacing={1} sx={{maxWidth:'510px', margin:'6px', display:'flex', justifyContent:'space-between'}}>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            colorKeyboardValue={
              Object.prototype.hasOwnProperty.call(colorKeyboard, key) ? colorKeyboard[key] : 'rgb(226, 232, 240)'
            }
          />
        ))}
      </Grid>
      <Grid container spacing={1} sx={{maxWidth:'510px', margin:'6px', display:'flex', justifyContent:'space-between'}}>
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            colorKeyboardValue={
              Object.prototype.hasOwnProperty.call(colorKeyboard, key) ? colorKeyboard[key] : 'rgb(226, 232, 240)'
            }
          />
        ))}
      </Grid>
    </Box>
  );
};
