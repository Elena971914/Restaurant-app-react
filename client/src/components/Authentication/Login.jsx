import styles from './Login.Module.css'
import { Link, useNavigate} from 'react-router-dom';
import { useContext, useState } from 'react';
import * as authenticationService from '../../services/authenticationServices'
import UserContext from '../../contexts/UserContext'

export default function Login() {
    const { loginHandler }= useContext(UserContext)
    const [values, setValues] = useState({email: '', password: ''});

    const onChange = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        loginHandler(values.email, values.password)
    }

  return (
      <form className="loginField" onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" value={values.email} onChange={onChange} placeholder="Email"></input>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={values.password} onChange={onChange} placeholder="Password"></input>

        <button type="submit" className="btn btn-primary btn-secondary py-2 px-4 margin authButtons">Login</button>
        <Link to='/register'><button type="button" className="btn btn-primary btn-secondary py-2 px-4 margin authButtons">Register</button></Link>
      </form>
  );
}
