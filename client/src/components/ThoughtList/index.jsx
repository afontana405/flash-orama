import { Link } from "react-router-dom";
import FlipCard from "../FlipCard";
import { FaTrashAlt } from "react-icons/fa";
const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Flashcards Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      <div className="d-flex">
        {thoughts &&
          thoughts.map((thought) => (
            <div key={thought._id} className="card m-3 ">
             

              <FlipCard _id={thought._id} front={thought.front} back={thought.back} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ThoughtList;
