import { getHeaders } from "./getHeaders";

const BASE_URL = 'http://localhost:3030/data/competitorRecipes';

export const getAll = async () => {
    try {
        const response = await fetch(BASE_URL);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Error fetching all recipes:', error);
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(`Error fetching recipe with ID ${id}:`, error);
        throw error;
    }
};

export const create = async (values) => {
    try {
        const headers = getHeaders();
        const response = await fetch(BASE_URL, { method: 'POST', body: JSON.stringify(values), headers });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('Error creating recipe:', error);
        throw error;
    }
};

export const edit = async (values, id) => {
    try {
        const headers = getHeaders();
        const response = await fetch(`${BASE_URL}/${id}`, { method: 'PUT', body: JSON.stringify(values), headers });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(`Error editing recipe with ID ${id}:`, error);
        throw error;
    }
};

export const remove = async (id) => {
    try {
        const headers = getHeaders();
        await fetch(`${BASE_URL}/${id}`, { method: 'DELETE', headers });
    } catch (error) {
        console.log(`Error deleting recipe with ID ${id}:`, error);
        throw error;
    }
};