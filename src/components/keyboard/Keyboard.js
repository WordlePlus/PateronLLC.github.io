// import { getStatuses } from '../../lib/statuses';
import { Key } from './Key';
import { useEffect } from 'react';

export const Keyboard = ({ onChar, onDelete, onEnter, guesses, isRevealing }) => {
  // const charStatuses = getStatuses(guesses);

  const onClick = (value) => {
    if (value === 'ENTER') {
      onEnter();
    } else if (value === 'DELETE') {
      onDelete();
    } else {
      onChar(value);
    }
  };

  useEffect(() => {
    const listener = (e) => {
      console.log('e.code?', e.code);
      if (e.code === 'Enter') {
        onEnter();
      } else if (e.code === 'Backspace') {
        onDelete();
      } else {
        const { key } = e;
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key);
        }
      }
    };
    window.addEventListener('keyup', listener);
    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [onEnter, onDelete, onChar]);

  return (
    <div>
      <div className="flex justify-center mb-1">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            // status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        <Key width={68.3} value="DELETE" onClick={onClick}>
          Delete
        </Key>
      </div>
      <div className="flex justify-center mb-1">
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            // status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        <Key width={68.3} value="ENTER" onClick={onClick}>
          Enter
        </Key>
      </div>
      <div className="flex justify-center">
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            // status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
    </div>
  );
};
