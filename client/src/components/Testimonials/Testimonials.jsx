import { useContext, useEffect, useReducer, useState } from "react";
import reducer from "./testimonialsReducer";
import * as testimonialServices from "../../services/testimonialServices";
import UserContext from "../../contexts/UserContext";
import styles from "./Testimonials.Module.css"

export default function Testimonials() {
  const { isAuthenticated, email } = useContext(UserContext);
  const [testimonials, dispatch] = useReducer(reducer, []);
  const [values, setValues] = useState({
    text: "",
    email: "",
  });
  const [user, setUser] = useState(() => {
    isAuthenticated ? email : "";
  });

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
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setUser(emailAreaValue);
    const newTestimonial = await testimonialServices.create(
      user,
      textareaValue
    );

    newTestimonial.owner = { email };

    dispatch({
      type: "ADD_COMMENT",
      data: newComment,
    });
  };

  return (
    <div className='mainContainer'>
      <h1>TESTIMONIALS</h1>

      {testimonials &&
        testimonials.map((testimonial) => (
          <div className='commentField' key={testimonial._id}>
            <small>{testimonial.email}</small>
            <p>{testimonial.text}</p>
          </div>
        ))}

      {testimonials.length === 0 && <p>No comments from users.</p>}
      <form onSubmit={onSubmit}>
        <h3>TELL US YOUR OPINION</h3>
        {!isAuthenticated && (
          <>
            <input
            placeholder='Enter your email address'
              name="email"
              type="email"
              value={values.email}
              onChange={onChange}
            ></input>
          </>
        )}
        <textarea
          placeholder="Write your comment here"
          name="text"
          value={values.text}
          onChange={onChange}
        ></textarea>
        <button type="submit" className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
}
