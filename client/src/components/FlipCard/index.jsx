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

      
    { catch (err) {
      console.error(err);
    }
  }
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      
      <div className="card border border-0">
      <div className="card-body position-relative">
        <div className="position-absolute top-1 start-1 z-index-3" onClick={()=>handleDelete(_id)} >
              <FaTrashAlt className="text-danger" />
              </div>
      <div className="m-4 mt-5 pt-2 pb-2">
        {front}
        </div>

        <button className ="btn btn-info" onClick={handleFlip}>Click for Answer</button>
        </div>
      </div>

      <div className="card border border-0">
        <div className="card-body position-relative">
        <div className="position-absolute top-1 start-1 z-index-3" onClick={()=>handleDelete(_id)} >

              <FaTrashAlt className="text-danger" />
              </div>
      <div className="m-4 mt-5 pt-2 pb-2">

      {back}
      </div> 
        <button className ="btn btn-outline-info" onClick={handleFlip}>Click for Question</button>
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default FlipCard;
