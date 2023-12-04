import { getHeaders } from "./getHeaders";

const BASE_URL = 'http://localhost:3030/data/testimonials'

export const create = async (fullName, text) => {
    const data = { fullName, text }
    const headers = getHeaders()
    const newTestimonial = await fetch(BASE_URL, { method: 'POST', body: JSON.stringify(data), headers });
    const result = await newTestimonial.json()
    return result;
};

export const getAll = async () => {
    const result = await fetch(BASE_URL);

    return result;
};

export const remove = async (id) => {
    const headers = getHeaders()
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE', headers })
}

export const getOne = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`)
        const result = await response.json()
        return result
    }
    catch { }
}

export const edit = async (id, text, fullName) => {
    try {
        const data = { text, fullName }
        const headers = getHeaders()
        const editedTest = await fetch(`${BASE_URL}/${id}`, { method: 'PUT', body: JSON.stringify(data), headers });
        const result = await editedTest.json()
        return result;
    }
    catch { }
}
