import React, { createContext, useState, useCallback } from 'react'
import { get } from '../lib/apiClient.js'
import { findById } from '../lib/utils.js'

const SportContext = createContext()

const SportProvider = ({ children }) => {
  const [sports, setSports] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fetchSports = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await get('deportes')
      setSports(data)
    } catch (err) {
      console.error('Error al cargar deportes:', err)
      setError('Error al cargar los deportes: ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const getSportById = useCallback((id) => {
    return findById(sports, id)
  }, [sports])

  const value = {
    sports,
    loading,
    error,
    fetchSports,
    getSportById,
  }

  return (
    <SportContext.Provider value={value}>
      {children}
    </SportContext.Provider>
  )
}

export default SportProvider
export { SportContext }
