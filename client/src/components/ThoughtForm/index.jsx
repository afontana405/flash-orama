import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_CARD,EDIT_CARD } from "../../utils/mutations";
import { QUERY_CARDS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const ThoughtForm = ({ editCardDetails, handleCancelClick }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [addCard, { error }] = useMutation(ADD_CARD, {
    refetchQueries: [QUERY_CARDS, "getCards", QUERY_ME, "me"],
  });
  
  const [editCard, { editError }] = useMutation(EDIT_CARD, {
    refetchQueries: [QUERY_CARDS, "getCards", QUERY_ME, "me"],
  });
  useEffect(() => {
    if (editCardDetails) {
      setQuestion(editCardDetails.front);
      setAnswer(editCardDetails.back);
    }
  }, [editCardDetails]);
  console.log(editCardDetails);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(question, answer);
      if (editCardDetails) {
        const { data } = await editCard({
          variables: {
            _id: editCardDetails._id,
            question,
            answer,
          },
        });
        handleCancelClick();
      } else {
        const { data } = await addCard({
          variables: {
            question,
            answer,
          },
        });
      }

      setQuestion("");
      setAnswer("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "question" && value.length <= 280) {
      setQuestion(value);
    }
    if (name === "answer" && value.length <= 280) {
      setAnswer(value);
    }
  };

  return (
    <div>
      <h3>Create new Flashcard</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="question"
                placeholder="Prompt..."
                value={question}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="answer"
                placeholder="Answer..."
                value={answer}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-3 ">
              {editCardDetails ? (
                <>
                  <button
                    className="btn btn-secondary btn-block py-3 mb-4"
                    type="button"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary btn-block py-3"
                    type="submit"
                  >
                    Update
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary btn-block py-3"
                  type="submit"
                >
                  Add Card
                </button>
              )}
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
            {editError && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {editError.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ThoughtForm;
