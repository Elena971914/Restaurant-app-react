import { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import reducer from "./testimonialsReducer";
import * as testimonialServices from "../../services/testimonialServices";
import UserContext from "../../contexts/UserContext";
import styles from "./Testimonials.Module.css";

export default function Testimonials() {
  const { isAuthenticated, email } = useContext(UserContext);
  const [testimonials, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState('');
  // const [manualPreRender, setManualPreRender] = useState("");

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
    setText((state) => state = e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTestimonial = await testimonialServices.create(email, text);

    dispatch({
      type: "ADD_TESTIMONIAL",
      data: newTestimonial,
    });

    setText('')
    // setManualPreRender("yes");
  };

  return (
    <div className="mainContainer">
      <h1>TESTIMONIALS</h1>

      {testimonials && (
        testimonials.map((testimonial) => (
          <div className="commentField" key={testimonial._id}>
            <small key={Math.random()}>{testimonial.email}</small>
            <p key={Math.random()}>{testimonial.text}</p>
          </div>
        )))}

      {testimonials.length === 0 && (<h6>No comments from users.</h6>)}

      <form onSubmit={onSubmit}>
        <h3>TELL US YOUR OPINION</h3>
        {!isAuthenticated && (
          <>
            <h6>Please, login or register first.</h6>
            <div>
              <Link to="/login">
                <button type="button" className="btn btn-primary" style={{width:"45%", marginRight:"30px"}}>
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button type="button" className="btn btn-primary" style={{width:"45%"}}>
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
