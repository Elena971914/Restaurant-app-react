import { getHeaders } from "./getHeaders"


const BASE_URL = 'http://localhost:3030/data/bookings'

export const create = async (values) => {
    try {
        const headers = getHeaders()
        const response = await fetch(BASE_URL, { method: 'POST', body: JSON.stringify(values), headers })
        const result = await response.json()
        return result;
    }
    catch (error) { console.log(error) }
}

export const getBooking = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/${userId}`)
        const result = await response.json()
        console.log(result)
        return result
    }
    catch (error) { console.log(error) }
}