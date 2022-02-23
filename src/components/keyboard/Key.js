export const Key = ({ children, width = 40, value, onClick, colorKeyboardValue }) => {
  const styles = {
    backgroundColor: colorKeyboardValue,
    width: `${width}px`,
    height: '58px',
  };

  const handleClick = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  return (
    <button style={styles} onClick={handleClick}>
      {children || value}
    </button>
  );
};
