export const getHeaders = () => {
    const token = localStorage.getItem('accessToken');
    let headers = {'Content-Type': 'application/json'}
    if (token) {
        headers = {
            'X-Authorization': token
        };
    }
    return headers
}