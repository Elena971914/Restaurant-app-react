const BASE_URL = 'http://localhost:3030/data/menu/'

export const getAll = async () => {
    try {
        const response = await fetch(BASE_URL);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Error in getAll:', error);
        throw error;
    }
};