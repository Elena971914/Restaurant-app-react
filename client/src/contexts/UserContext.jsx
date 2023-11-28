import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as authenticationServices from '../services/authenticationServices';
import useRemainingState from "../hooks/useRemainingState";

const UserContext = createContext();
UserContext.displayName = 'UserContext';

export const UserProvider = ({
    children,
}) => {
    const [user, setUser] = useRemainingState('user', {})
    const [valid, setValid] = useState('true')
    const navigate = useNavigate()

    const loginHandler = async (email, password) => {
        const result = await authenticationServices.login(email, password);
        if (result.error === 'Invalid credentials') {
            // Handle invalid credentials scenario (e.g., display an error message to the user)
            console.log('Invalid credentials. Please try again.');
            setValid('')
        }
         else {
        localStorage.setItem('accessToken', result.accessToken);
        setUser(result);
        navigate('/');
    }};

    const registerHandler = async (email, password) => {
        const result = await authenticationServices.register(email, password);
        localStorage.setItem('accessToken', result.accessToken);
        setUser(result);
        navigate('/');
    };

    const logoutHandler = () => {
        setUser({});
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
    };

    const userValues = {
        loginHandler,
        registerHandler,
        logoutHandler,
        email: user.email,
        userId: user._id,
        isAuthenticated: !!user.accessToken,
        isValid: valid
    };

    return (
        <UserContext.Provider value={userValues}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext
