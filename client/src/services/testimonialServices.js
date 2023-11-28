import { getHeaders } from "./getHeaders";

const BASE_URL = 'http://localhost:3030/data/testimonials'

export const create = async (ownerId, text) => {
    const data = {ownerId, text}
    const headers = getHeaders()
    const newTestimonial = await fetch(BASE_URL, {method: 'POST', body: JSON.stringify(data), headers});

    return newTestimonial;
};

export const getAll = async () => {
    const result = await fetch(BASE_URL);

    return result;
};