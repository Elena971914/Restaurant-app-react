import { getHeaders } from "./getHeaders";

const BASE_URL = 'http://localhost:3030/data/testimonials';

export const create = async (fullName, text) => {
    try {
        const data = { fullName, text };
        const headers = getHeaders();
        const newTestimonial = await fetch(BASE_URL, { method: 'POST', body: JSON.stringify(data), headers });
        const result = await newTestimonial.json();
        return result;
    } catch (error) {
        console.log('Error creating testimonial:', error);
        throw error;
    }
};

export const getAll = async () => {
    try {
        const result = await fetch(BASE_URL);
        return result;
    } catch (error) {
        console.log('Error fetching all testimonials:', error);
        throw error;
    }
};

export const remove = async (id) => {
    try {
        const headers = getHeaders();
        await fetch(`${BASE_URL}/${id}`, { method: 'DELETE', headers });
    } catch (error) {
        console.log(`Error removing testimonial with ID ${id}:`, error);
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(`Error fetching testimonial with ID ${id}:`, error);
        throw error;
    }
};

export const edit = async (id, text, fullName) => {
    try {
        const data = { text, fullName };
        const headers = getHeaders();
        const editedTest = await fetch(`${BASE_URL}/${id}`, { method: 'PUT', body: JSON.stringify(data), headers });
        const result = await editedTest.json();
        return result;
    } catch (error) {
        console.log(`Error editing testimonial with ID ${id}:`, error);
        throw error;
    }
};

