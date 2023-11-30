import { getHeaders } from "./getHeaders"

const BASE_URL = 'http://localhost:3030/data/competitorRecipes'


export const getAll = async() => {
    try {
        const response = await fetch(BASE_URL)
        const result = await response.json()
        return result
    }
    catch {}
}

export const getOne = async(id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`)
        const result = await response.json()
        console.log("I am here")
        return result
    }
    catch {}
}

export const create = async(values) => {
    try{
    const headers = getHeaders()
    const response = await fetch(BASE_URL, {method: 'POST', body: JSON.stringify(values), headers})
    const result = await response.json()
    return result;
    }
    catch{}
}