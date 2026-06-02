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

const get = async (endpoint, token = null) => {
  const response = await fetch(buildUrl(endpoint), {
    cache: 'no-store',
    headers: buildHeaders(token),
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return response.json()
}

const post = async (endpoint, body, token = null) => {
  const response = await fetch(buildUrl(endpoint), {
    method: 'POST',
    headers: buildHeaders(token),
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return response.json()
}

const put = async (endpoint, body, token = null) => {
  const response = await fetch(buildUrl(endpoint), {
    method: 'PUT',
    headers: buildHeaders(token),
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return response.json()
}

const patch = async (endpoint, body, token = null) => {
  const response = await fetch(buildUrl(endpoint), {
    method: 'PATCH',
    headers: buildHeaders(token),
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return response.json()
}

const del = async (endpoint, token = null) => {
  const response = await fetch(buildUrl(endpoint), {
    method: 'DELETE',
    headers: buildHeaders(token),
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return response.json()
}

export { get, post, put, patch, del }

export const useApi = () => {
  return { get, post, put, patch, del }
}
