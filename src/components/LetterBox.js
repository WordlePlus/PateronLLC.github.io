const LetterBox = (props) => {
	return <div className="letter-box">
      <span className="tooltip-text">Sully is a Silly Goose! <br/>🦢</span>
      {props.letter}
    </div>;
};

export default LetterBox;
