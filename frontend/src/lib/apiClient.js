const BASE_URL = import.meta.env.VITE_API_URL

const buildHeaders = (token) => {
    const headers = { "Content-Type": "application/json" }
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    return headers
}

const get = async (endpoint, token) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        headers: buildHeaders(token)
    })
    if(!response.ok) {
        throw new Error(await response.text());
    }
    return response.json()
}

const post = async(endpoint, body, token = null) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: buildHeaders(token),
        body: JSON.stringify(body)
    })
    if(!response.ok){
        throw new Error(await response.text());
    }
    return response.json()
}

const del = async(endpoint, token) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "DELETE",
        headers: buildHeaders(token)
    })
    if(!response.ok){
        throw new Error(await response.text());
    }
    return response.json()
}

const put = async(endpoint, body, token) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "PUT",
        headers: buildHeaders(token),
        body: JSON.stringify(body)
    })
    if(!response.ok){
        throw new Error(await response.text());
    }
    return response.json()
}

const patch = async(endpoint, body, token) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "PATCH",
        headers: buildHeaders(token),
        body: JSON.stringify(body)
    })
    if(!response.ok){
        throw new Error(await response.text());
    }
    return response.json()
}

export {get, post, del, put, patch}