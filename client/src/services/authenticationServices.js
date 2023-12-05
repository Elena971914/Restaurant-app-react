import { getHeaders } from "./getHeaders";

const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
    try {
        const data = ({ email, password })
        const headers = getHeaders()
        const response = await fetch(`${baseUrl}/login`, { method: 'POST', body: JSON.stringify(data), headers })

        if (response.status === 403) {
            // Handle incorrect credentials without throwing an error
            return { error: 'Invalid credentials' };
        } else if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const result = await response.json()
        return result;
    } 
    catch (error) {
        console.log(error);
        // Handle other errors if needed
    }
};

export const register = async (email, password, fullName) => {
    const data = ({ "email": email, "password": password, "fullName": fullName });
    const headers = getHeaders()

    const response = await fetch(`${baseUrl}/register`, { method: 'POST', body: JSON.stringify(data), headers })

    const result = await response.json()
    return result;
}

export const logout = async () => {
    const headers = getHeaders()

    try {
        await fetch(`${baseUrl}/logout`, { headers })
    } catch (err) {
        console.log(err)
    }
}