const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const defaultMatchLevels = ['Principiante', 'Intermedio', 'Avanzado']

const parseDate = (value) => {
  if (value instanceof Date) {
    return value
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  return new Date(value)
}

const formatDate = (value, fallback = '--') => {
  if (!value) {
    return fallback
  }

  const date = parseDate(value)
  return Number.isNaN(date.getTime()) ? fallback : dateFormatter.format(date)
}

const formatTime = (value, fallback = '--:--') => {
  return value ? String(value).slice(0, 5) : fallback
}

const getInitial = (value = '', fallback = 'U') => {
  const text = value === null || value === undefined ? '' : String(value)
  return (text.trim()[0] || fallback).toUpperCase()
}

const getErrorMessage = (error) => {
  return error instanceof Error ? error.message : String(error)
}

const buildQueryString = (values) => {
  const params = new URLSearchParams()

  Object.entries(values).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      params.set(key, value)
    }
  })

  const query = params.toString()
  return query ? `?${query}` : ''
}

const findById = (items, id) => {
  return items.find((item) => String(item.id) === String(id))
}

const getMatchLevels = (matches) => {
  const matchLevels = matches.map((match) => match.nivel).filter(Boolean)
  return [...new Set([...defaultMatchLevels, ...matchLevels])]
}

export {
  buildQueryString,
  findById,
  formatDate,
  formatTime,
  getErrorMessage,
  getInitial,
  getMatchLevels,
}
