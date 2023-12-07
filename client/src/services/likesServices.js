import { getHeaders } from "./getHeaders";

const BASE_URL = 'http://localhost:3030/data/likes';

export const getAll = async () => {
    try {
        const response = await fetch(BASE_URL);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Error fetching all likes:', error);
        throw error;
    }
};

export const create = async (data) => {
    try {
        const headers = getHeaders();
        const response = await fetch(BASE_URL, { method: 'POST', body: JSON.stringify(data), headers });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Error creating like:', error);
        throw error;
    }
};

export const like = async (id, data) => {
    try {
        const headers = getHeaders();
        const response = await fetch(`${BASE_URL}/${id}`, { method: 'PUT', body: JSON.stringify(data), headers });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(`Error liking with ID ${id}:`, error);
        throw error;
    }
};
