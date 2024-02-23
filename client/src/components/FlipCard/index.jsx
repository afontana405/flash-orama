import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { FaTrashAlt } from "react-icons/fa";
import { QUERY_CARDS, QUERY_ME } from "../../utils/queries";
import { DELETE_CARD } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const FlipCard = ({_id, front, back }) => {
  const [isFlipped, setIsFliped] = useState(false);
  const handleFlip = (event) => {
    setIsFliped(!isFlipped);
  };
  const [deleteCard, { error }] = useMutation
  (DELETE_CARD, {
    refetchQueries: [
      QUERY_CARDS,
      'getCards',
      QUERY_ME,
      'me'
    ]
  });
  const handleDelete = async(uniqueID)=> {
    try {
 
      const { data } = await deleteCard({
        variables: {
          _id:uniqueID
             },
      });

      
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      
      <div className="card">
      <div className="card-body position-relative">
        <div className="position-absolute top-1 right-1 z-index-3" onClick={()=>handleDelete(_id)} >
              <FaTrashAlt />
              </div>
      <div className="mt-4">
        {front}
        </div>

        <button className ="btn" onClick={handleFlip}>Click to flip</button>
        </div>
      </div>

      <div className="card">
        <div className="card-body position-relative">
        <div className="position-absolute top-1 right-1 z-index-3" onClick={()=>handleDelete(_id)} >

              <FaTrashAlt />
              </div>
      <div className="mt-4">

      {back}
      </div> 
        <button className ="btn" onClick={handleFlip}>Click to flip</button>
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default FlipCard;
