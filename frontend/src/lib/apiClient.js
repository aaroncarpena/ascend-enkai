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

const fieldLabels = {
  name: 'usuario',
  email: 'correo electronico',
  password: 'contrasena',
  password_confirmation: 'confirmacion de contrasena',
  telefono: 'telefono',
  login: 'usuario o correo electronico',
  nombre: 'nombre',
  direccion: 'direccion',
  municipio_id: 'municipio',
  horario_apertura: 'hora de apertura',
  horario_clausura: 'hora de cierre',
  hora_inicio: 'hora de inicio',
  hora_fin: 'hora de fin',
}

const getFieldLabel = (field) => fieldLabels[field] || String(field).replaceAll('_', ' ')

const translateLaravelMessage = (message) => {
  if (!message) {
    return ''
  }

  const text = String(message)
  const uniqueMatch = text.match(/^The (.+) has already been taken\.$/)
  if (uniqueMatch) {
    return `El ${getFieldLabel(uniqueMatch[1])} ya esta en uso.`
  }

  const requiredMatch = text.match(/^The (.+) field is required\.$/)
  if (requiredMatch) {
    return `El campo ${getFieldLabel(requiredMatch[1])} es obligatorio.`
  }

  const emailMatch = text.match(/^The (.+) field must be a valid email address\.$/)
  if (emailMatch) {
    return 'Introduce un correo electronico valido.'
  }

  const confirmationMatch = text.match(/^The (.+) field confirmation does not match\.$/)
  if (confirmationMatch) {
    return `La confirmacion de ${getFieldLabel(confirmationMatch[1])} no coincide.`
  }

  const minMatch = text.match(/^The (.+) field must be at least (\d+) characters\.$/)
  if (minMatch) {
    return `El campo ${getFieldLabel(minMatch[1])} debe tener al menos ${minMatch[2]} caracteres.`
  }

  const maxMatch = text.match(/^The (.+) field must not be greater than (\d+) characters\.$/)
  if (maxMatch) {
    return `El campo ${getFieldLabel(maxMatch[1])} no puede superar ${maxMatch[2]} caracteres.`
  }

  const formatMatch = text.match(/^The (.+) field (?:format is invalid|must match the format .+)\.$/)
  if (formatMatch) {
    return `El formato de ${getFieldLabel(formatMatch[1])} no es valido.`
  }

  const existsMatch = text.match(/^The selected (.+) is invalid\.$/)
  if (existsMatch) {
    return `El ${getFieldLabel(existsMatch[1])} seleccionado no es valido.`
  }

  const differentMatch = text.match(/^The (.+) field must be different from (.+)\.$/)
  if (differentMatch) {
    return `${getFieldLabel(differentMatch[1])} debe ser diferente de ${getFieldLabel(differentMatch[2])}.`
  }

  return text
}

const getApiErrorMessage = (payload, status) => {
  if (payload && typeof payload === 'object') {
    const validationMessages = Object.values(payload.errors || {})
      .flat()
      .filter(Boolean)
      .map(translateLaravelMessage)

    if (validationMessages.length > 0) {
      return [...new Set(validationMessages)].join(' ')
    }

    if (payload.message) {
      return translateLaravelMessage(payload.message)
    }
  }

  if (typeof payload === 'string' && payload.trim()) {
    return translateLaravelMessage(payload)
  }

  return `No se pudo completar la solicitud. Codigo ${status}.`
}

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text()

  if (!response.ok) {
    throw new Error(getApiErrorMessage(payload, response.status))
  }

  return payload
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
