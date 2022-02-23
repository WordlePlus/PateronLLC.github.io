const LetterBox = ({ color, char }) => {
  return (
    <div className="letter-box" style={{ backgroundColor: color }}>
      {char}
    </div>
  );
};

export default LetterBox;
