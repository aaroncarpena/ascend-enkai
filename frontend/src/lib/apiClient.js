const BASE_URL = import.meta.env.VITE_API_URL

const get = async (endpoint, token) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`}
    })
    if(!response.ok) {
        throw new Error(await response.text());
    } 
    return response.json()
}

const post = async(endpoint, body) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
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
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`}
    })
    if(!response.ok){
        throw new Error(await response.text());
    }
    return response.json()
}

const put = async(endpoint, body, token) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
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
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
        body: JSON.stringify(body)
    })
    if(!response.ok){
        throw new Error(await response.text());
    }
    return response.json()
}


export {get, post, del, put, patch}