import { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import reducer from "./testimonialsReducer";
import * as testimonialServices from "../../services/testimonialServices";
import UserContext from "../../contexts/UserContext";
import styles from "./Testimonials.Module.css";
import EditTestimonial from "./EditTestimonial/EditTestimonial"

export default function Testimonials() {
  const { isAuthenticated, fullName } = useContext(UserContext);
  const [testimonials, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState("");
  const [showEdit, setShowEdit] = useState(false)
  const [editTestId, setEditTestId] = useState("")

  useEffect(() => {
    testimonialServices
      .getAll()
      .then((result) => result.json())
      .then((result) =>
        dispatch({
          type: "GET_ALL_TESTIMONIALS",
          data: result,
        })
      );
  }, []);

  const onChange = (e) => {
    setText((state) => (state = e.target.value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTestimonial = await testimonialServices.create(fullName, text);

    dispatch({
      type: "ADD_TESTIMONIAL",
      data: newTestimonial,
    });

    setText("");
  };

  const deleteHandler = async (e) => {
    try {
      await testimonialServices.remove(e.target.id); // Assuming testimonialServices.remove(id) handles the deletion
      dispatch({ type: "DELETE_TESTIMONIAL", id: e.target.id });
    } catch (error) {
      console.error(error);
    }
  };

  const editHandler = async (e) => {
    setEditTestId(e.target.id)
    setShowEdit(true)
  };

  const onClose = async () => {
    setShowEdit(false)
    testimonialServices
      .getAll()
      .then((result) => result.json())
      .then((result) =>
        dispatch({
          type: "GET_ALL_TESTIMONIALS",
          data: result,
        })
      );
  }

  return (
    <div className="mainContainer">
      <h1>TESTIMONIALS</h1>

      {showEdit && <EditTestimonial id={editTestId} onClose={onClose} />}

      {testimonials &&
        testimonials.map((testimonial) => (
          <div className="commentField" key={testimonial._id}>
            <small key={Math.random()}>{testimonial.fullName}</small>
            <p key={Math.random()}>{testimonial.text}</p>
            {fullName === testimonial.fullName && (
              <>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={editHandler}
                  id={testimonial._id}
                  style={{
                    backgroundColor: "white",
                    color: "orange",
                    border: "2px solid orange",
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={deleteHandler}
                  id={testimonial._id}
                  className="btn"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}

      {testimonials.length === 0 && <h6>No comments from users.</h6>}

      <form onSubmit={onSubmit}>
        <h3>TELL US YOUR OPINION</h3>
        {!isAuthenticated && (
          <>
            <h6>Please, login or register first.</h6>
            <div>
              <Link to="/login">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "45%", marginRight: "30px" }}
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "45%" }}
                >
                  Register
                </button>
              </Link>
            </div>
          </>
        )}
        {isAuthenticated && (
          <>
            <textarea
              placeholder="Write your comment here"
              name="text"
              value={text}
              onChange={onChange}
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
}
