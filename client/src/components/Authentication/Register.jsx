import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

export default function Register() {
  const { registerHandler } = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerHandler(values.email, values.password);
  };

  return (
    <form className="loginField" onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={values.email}
        onChange={onChange}
        placeholder="Email"
      ></input>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={onChange}
        placeholder="Password"
      ></input>
      <label htmlFor="confirmPassword">Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={onChange}
        placeholder="Password"
      ></input>

      <button
        type="submit"
        className="btn btn-primary btn-secondary py-2 px-4 margin authButtons"
      >
        Register
      </button>
    </form>
  );
}
