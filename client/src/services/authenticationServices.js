import { getHeaders } from "./getHeaders";

const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
    const data = { email, password };
    const headers = getHeaders();

    const response = await fetch(`${baseUrl}/login`, { method: 'POST', body: JSON.stringify(data), headers });

    if (!response.ok) {
        if (response.status === 403) {
            return { error: 'Invalid credentials' };
        } else {
            throw new Error('Network response was not ok.');
        }
    }

    const result = await response.json();
    return result;
};

export const register = async (email, password, fullName) => {
    const data = { "email": email, "password": password, "fullName": fullName };
    const headers = getHeaders();

    const response = await fetch(`${baseUrl}/register`, { method: 'POST', body: JSON.stringify(data), headers });

    if (!response.ok) {
        throw new Error('Registration failed');
    }

    const result = await response.json();
    return result;
};


export const logout = async () => {
    try {
        const headers = getHeaders()
        await fetch(`${baseUrl}/logout`, { headers })
    } catch (err) {
        console.log(err)
    }
}