import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../../contexts/UserContext";

export default function Register() {
  const { registerHandler } = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  });

  const onChange = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const fullName = `${values.firstName} ${values.lastName}`
    registerHandler(values.email, values.password, fullName);
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
      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={onChange}
        placeholder="Confirm password"
      ></input>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        name="firstName"
        value={values.firstName}
        onChange={onChange}
        placeholder="First name"
      ></input>
      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        name="lastName"
        value={values.lastName}
        onChange={onChange}
        placeholder="Last name"
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
