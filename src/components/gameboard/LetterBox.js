const LetterBox = ({ color, char }) => {
  return (
    <div className="letter-box" style={{ backgroundColor: color }}>
      <span className="tooltip-text">
        Sully is a Silly Goose! <br />
        🦢
      </span>
      {char}
    </div>
  );
};

export default LetterBox;
