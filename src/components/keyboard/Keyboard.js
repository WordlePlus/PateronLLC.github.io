import { Key } from './Key';
import { useEffect } from 'react';

export const Keyboard = ({
  finalWord,
  squares,
  setSquares,
  squareColors,
  setSquareColors,
  currSquare,
  setCurrSquare,
  setGameOver,
  setWon,
  onChar,
  onDelete,
  onEnter,
  colorKeyboard,
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
        case key === 'Backspace' || key === 'Delete':
          onDelete();
          break;

        case (key === 'Enter' || key === 'Return') && currSquare[1] >= squares[0].length:
          onEnter();
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
    setGameOver,
    setSquareColors,
    setSquares,
    onChar,
    onDelete,
    onEnter,
  ]);

  return (
    <div>
      <div>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            colorKeyboardValue={
              Object.prototype.hasOwnProperty.call(colorKeyboard, key) ? colorKeyboard[key] : 'tan'
            }
          />
        ))}
        <Key width={68.3} value="Delete" onClick={onClick}>
          Delete
        </Key>
      </div>
      <div>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            colorKeyboardValue={
              Object.prototype.hasOwnProperty.call(colorKeyboard, key) ? colorKeyboard[key] : 'tan'
            }
          />
        ))}
        <Key width={68.3} value="Enter" onClick={onClick}>
          Enter
        </Key>
      </div>
      <div>
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            colorKeyboardValue={
              Object.prototype.hasOwnProperty.call(colorKeyboard, key) ? colorKeyboard[key] : 'tan'
            }
          />
        ))}
      </div>
    </div>
  );
};
