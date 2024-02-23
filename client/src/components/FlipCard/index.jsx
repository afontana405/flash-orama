import { useState } from "react";
import ReactCardFlip from "react-card-flip";

const FlipCard = ({ front, back }) => {
  const [isFlipped, setIsFliped] = useState(false);
  const handleFlip = (event) => {
    setIsFliped(!isFlipped);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      
      <div className="card">
        <div className="card-body">
        {front}
        <button className ="btn" onClick={handleFlip}>Click to flip</button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
        {back}
        <button className ="btn" onClick={handleFlip}>Click to flip</button>
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default FlipCard;
