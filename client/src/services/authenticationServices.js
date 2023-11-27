const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
    const data = ({ email, password })
    let headers = {}

    const token = localStorage.getItem('accessToken');
    if (token) {
        headers = {
            ...headers,
            'X-Authorization': token
        };
    }

    const response = await fetch(`${baseUrl}/login`, { method: 'POST', body: JSON.stringify(data), headers})
    const result = await response.json()

    return result;
};

export const register = async (email, password) => {
    const data = ({ "email": email, "password": password })
    let headers = {}

    const token = localStorage.getItem('accessToken');
    if (token) {
        headers = {
            ...headers,
            'X-Authorization': token
        };
    }

    const response = await fetch(`${baseUrl}/register`, { method: 'POST', body: JSON.stringify(data), headers})
    
    const result = await response.json()
    console.log(result)
    return result;
}

export const logout = async () => { await fetch(`${baseUrl}/logout`) };