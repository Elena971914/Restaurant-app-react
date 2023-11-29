import { getHeaders } from "./getHeaders";

const BASE_URL = 'http://localhost:3030/data/testimonials'

export const create = async (email, text) => {
    const data = {email, text}
    const headers = getHeaders()
    const newTestimonial = await fetch(BASE_URL, {method: 'POST', body: JSON.stringify(data), headers});
    const result = await newTestimonial.json()
    return result;
};

export const getAll = async () => {
    const result = await fetch(BASE_URL);

    return result;
};

export const remove = async (id) => {
    const headers = getHeaders()
    await fetch(`${BASE_URL}/${id}`, {method: 'DELETE', headers})
}
