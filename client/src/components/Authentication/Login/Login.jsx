import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import styles from "./Login.module.css";
import UserContext from "../../../contexts/UserContext";

export default function Login() {
  const { loginHandler, isValid } = useContext(UserContext);
  const [values, setValues] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginHandler(values.email, values.password);
  };

  return (
    <form className={styles.loginField} onSubmit={onSubmit}>
      {!isValid && (
        <p style={{ color: "#FF0000" }}>
          You tried to enter with wrong credentials. These email and password
          are not registered yet.
        </p>
      )}
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

      <button type="submit" className={styles.buttonLogin}>
        Login
      </button>
      <Link to="/register">
        <button type="button" className={styles.buttonLogin}>
          Register
        </button>
      </Link>
    </form>
  );
}
