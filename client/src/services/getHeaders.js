export const getHeaders = () => {
    const token = localStorage.getItem('accessToken');
    let headers = {}
    if (token) {
        headers = {
            'X-Authorization': token
        };
    }
    return headers
}