import React, { createContext, useState, useCallback } from 'react'
import { get, getApiCollection } from '../lib/apiClient.js'
import { findById } from '../lib/utils.js'

const SportCenterContext = createContext()

const SportCenterProvider = ({ children }) => {
  const [centers, setCenters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fetchSportCenters = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await get('instalacion')
      setCenters(getApiCollection(response))
    } catch (err) {
      console.error('Error al cargar instalaciones:', err)
      setError('No se pudieron cargar las instalaciones. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [])

  const getSportCenterById = useCallback(
    (id) => findById(centers, id),
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
