const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '')

const buildUrl = (endpoint) => {
  const normalizedEndpoint = String(endpoint).replace(/^\/+/, '')
  return `${BASE_URL}/${normalizedEndpoint}`
}

const buildHeaders = (token) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

const buildFormHeaders = (token) => {
  const headers = {
    Accept: 'application/json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

const parseResponse = async (response) => {
  if (!response.ok) {
    throw new Error(await response.text())
  }

  return response.json()
}

const getApiCollection = (response) => {
  if (Array.isArray(response)) {
    return response
  }

  return Array.isArray(response?.data) ? response.data : []
}

const get = async (endpoint, token = null) => {
  const response = await fetch(buildUrl(endpoint), {
    cache: 'no-store',
    headers: buildHeaders(token),
  })
  return parseResponse(response)
}

const post = async (endpoint, body, token = null) => {
  const response = await fetch(buildUrl(endpoint), {
    method: 'POST',
    headers: buildHeaders(token),
    body: JSON.stringify(body),
  })
  return parseResponse(response)
}

const postForm = async (endpoint, body, token = null) => {
  const response = await fetch(buildUrl(endpoint), {
    method: 'POST',
    headers: buildFormHeaders(token),
    body,
  })
  return parseResponse(response)
}

const put = async (endpoint, body, token = null) => {
  const response = await fetch(buildUrl(endpoint), {
    method: 'PUT',
    headers: buildHeaders(token),
    body: JSON.stringify(body),
  })
  return parseResponse(response)
}

const patch = async (endpoint, body, token = null) => {
  const response = await fetch(buildUrl(endpoint), {
    method: 'PATCH',
    headers: buildHeaders(token),
    body: JSON.stringify(body),
  })
  return parseResponse(response)
}

const del = async (endpoint, token = null) => {
  const response = await fetch(buildUrl(endpoint), {
    method: 'DELETE',
    headers: buildHeaders(token),
  })
  return parseResponse(response)
}

export { get, post, postForm, put, patch, del, getApiCollection }
