import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import styles from "./Register.module.css"

export default function Register() {
  const { registerHandler } = useContext(UserContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  });
  const [showEmailError, setShowEmailError] = useState(false)
  const [showPasswordError, setShowPasswordError] = useState(false)
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false)
  const [showNameError, setShowNameError] = useState(false)

  const onChange = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const fullName = `${values.firstName} ${values.lastName}`
    registerHandler(values.email, values.password, fullName);
  };

  const validate = (e) => {
    switch (e.target.name) {
      case 'email': {
        if (!values.email.includes('@')) {
          setShowEmailError(true)
        } else {setShowEmailError(false)}
        return
      };
      case 'password': {
        if (values.password.length < 6) {
          setShowPasswordError(true)
        } else {setShowPasswordError(false)}
        return
      };
      case 'confirmPassword': {
        if (values.password != values.confirmPassword) {
          setShowConfirmPasswordError(true) 
        }else {setShowConfirmPasswordError(false)}
        return
      };
      case 'firstName': {
        if (values.firstName.length < 2) {
          setShowNameError(true)
        } else {setShowNameError(false)}
        return
      };
      case 'lastName': {
        if (values.lastName.length < 2) {
          setShowNameError(true)
        } else {setShowNameError(false)}
        return
      };;
    }
  }

  return (
    <form className={styles.registerField} onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
      {showEmailError && <p className={styles.redPar}>The email should include '@'</p>}
      <input
        type="text"
        name="email"
        value={values.email}
        onChange={onChange}
        placeholder="Email"
        onBlur={validate}
      ></input>
      <label htmlFor="password">Password</label>
      {showPasswordError && <p className={styles.redPar}>The password should be at least 6 symbols long.</p>}
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={onChange}
        placeholder="Password"
        onBlur={validate}
      ></input>
      <label htmlFor="confirmPassword">Confirm password</label>
      {showConfirmPasswordError && <p className={styles.redPar}>The passwords you entered do not match.</p>}
      <input
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={onChange}
        placeholder="Confirm password"
        onBlur={validate}
      ></input>
      <label htmlFor="firstName">First name</label>
      {showNameError && <p className={styles.redPar}>The names should have more than 1 letter.</p>}
      <input
        type="text"
        name="firstName"
        value={values.firstName}
        onChange={onChange}
        placeholder="First name"
        onBlur={validate}
      ></input>
      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        name="lastName"
        value={values.lastName}
        onChange={onChange}
        placeholder="Last name"
        onBlur={validate}
      ></input>

      <button
        type="submit"
        className={styles.buttonRegister}
        disabled={showEmailError||showPasswordError||showConfirmPasswordError||showNameError}
      >
        Register
      </button>
    </form>
  );
}
