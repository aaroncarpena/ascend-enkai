import React, { createContext, useState, useCallback } from 'react'
import { useApi } from '../hooks/useApi'

const SportCenterContext = createContext()

const SportCenterProvider = ({ children }) => {
  const [centers, setCenters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { get } = useApi()

  const fetchSportCenters = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await get('instalacion')
      const payload = Array.isArray(response)
        ? response
        : response?.data || []

      setCenters(payload)
    } catch (err) {
      console.error('Error al cargar instalaciones:', err)
      setError('No se pudieron cargar las instalaciones. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [get])

  const getSportCenterById = useCallback(
    (id) => centers.find((center) => String(center.id) === String(id)),
    [centers],
  )

  const value = {
    centers,
    loading,
    error,
    fetchSportCenters,
    getSportCenterById,
  }

  return <SportCenterContext.Provider value={value}>{children}</SportCenterContext.Provider>
}

export default SportCenterProvider
export { SportCenterContext }
