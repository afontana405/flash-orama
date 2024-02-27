import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { FaTrashAlt } from "react-icons/fa";
import { QUERY_CARDS, QUERY_ME } from "../../utils/queries";
import { DELETE_CARD } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { MdModeEditOutline } from "react-icons/md";
const FlipCard = ({ _id, front, back, handleEditClick }) => {
  const [isFlipped, setIsFliped] = useState(false);
  const handleFlip = (event) => {
    setIsFliped(!isFlipped);
  };
  const [deleteCard, { error }] = useMutation(DELETE_CARD, {
    refetchQueries: [QUERY_CARDS, "getCards", QUERY_ME, "me"],
  });
  const handleDelete = async (uniqueID) => {
    try {
      const { data } = await deleteCard({
        variables: {
          _id: uniqueID,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
     <div className="card bgflipcard p-2">
      <div className="card-body position-relative">
        <div className="position-absolute top-0 px-2 d-flex justify-content-between w-100">
        <div onClick={() => handleDelete(_id)}>
              <FaTrashAlt color="red" />
            </div>
            <div onClick={handleEditClick}>
              <MdModeEditOutline />
            </div>
        </div>
        <div className="mt-4 mb-2">{front}</div>

        <button className="btn btn-primary mt-3" onClick={handleFlip}>
           Answer
        </button>
      </div>
    </div>

    <div className="card bgflipcard">
      <div className="card-body position-relative">
        <div className="position-absolute top-0 px-2 d-flex justify-content-between w-100">
        <div onClick={() => handleDelete(_id)}>
              <FaTrashAlt color="red" />
            </div>
            <div onClick={handleEditClick}>
              <MdModeEditOutline />
            </div>
        </div>
        <div className="mt-4 mb-2">{back}</div>

        <button className="btn btn-danger mt-3" onClick={handleFlip}>
         Question
        </button>
      </div>
    </div>
    </ReactCardFlip>
  );
  }
export default FlipCard;
