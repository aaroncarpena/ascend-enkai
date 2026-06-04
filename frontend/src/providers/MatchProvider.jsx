import React, { createContext, useCallback, useRef, useState } from 'react'
import useAuthProvider from '../hooks/useAuthProvider'
import useNotification from '../hooks/useNotification.js'
import { del, get, getApiCollection, post } from '../lib/apiClient.js'
import { buildQueryString } from '../lib/utils.js'

const MatchContext = createContext()

const defaultFilters = {
  nivel: '',
  fecha: '',
  deporte_id: '',
  instalacion_id: '',
}

const clearSportCenterFromFilters = (filters) => ({
  ...filters,
  instalacion_id: '',
})

const clearSportFromFilters = (filters) => ({
  ...filters,
  deporte_id: '',
})

const MatchProvider = ({ children }) => {
  const [matches, setMatches] = useState([])
  const [filters, setFilters] = useState(defaultFilters)
  const filtersRef = useRef(defaultFilters)
  const currentListRef = useRef({ type: 'sport', id: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { token, user, isAuthenticated } = useAuthProvider()
  const notification = useNotification()

  const fetchMatches = useCallback(
    async (sportId, nextFilters = filtersRef.current) => {
      const sportFilters = clearSportFromFilters(nextFilters)
      currentListRef.current = { type: 'sport', id: sportId }
      setLoading(true)
      setError('')

      try {
        const response = await get(`deportes/${sportId}/partidos${buildQueryString(sportFilters)}`)
        setMatches(getApiCollection(response))
      } catch (err) {
        console.error('Error al cargar partidos:', err)
        setError('No se pudieron cargar los partidos.')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const fetchMatchesBySportCenter = useCallback(
    async (sportCenterId, nextFilters = filtersRef.current) => {
      const sportCenterFilters = clearSportCenterFromFilters(nextFilters)
      currentListRef.current = { type: 'sportCenter', id: sportCenterId }
      setLoading(true)
      setError('')

      try {
        const response = await get(`instalacion/${sportCenterId}/partidos${buildQueryString(sportCenterFilters)}`)
        setMatches(getApiCollection(response))
      } catch (err) {
        console.error('Error al cargar partidos de la instalacion:', err)
        setError('No se pudieron cargar los partidos.')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const refreshCurrentMatches = async () => {
    const currentList = currentListRef.current

    if (!currentList.id) {
      return
    }

    if (currentList.type === 'sportCenter') {
      await fetchMatchesBySportCenter(currentList.id)
      return
    }

    await fetchMatches(currentList.id)
  }

  const updateFilters = (sportId, nextFilters) => {
    const sportFilters = clearSportFromFilters(nextFilters)
    filtersRef.current = sportFilters
    setFilters(sportFilters)
    fetchMatches(sportId, sportFilters)
  }

  const updateSportCenterFilters = (sportCenterId, nextFilters) => {
    const sportCenterFilters = clearSportCenterFromFilters(nextFilters)
    filtersRef.current = sportCenterFilters
    setFilters(sportCenterFilters)
    fetchMatchesBySportCenter(sportCenterId, sportCenterFilters)
  }

  const resetSportCenterFilters = useCallback(
    (sportCenterId) => {
      filtersRef.current = defaultFilters
      setFilters(defaultFilters)
      fetchMatchesBySportCenter(sportCenterId, defaultFilters)
    },
    [fetchMatchesBySportCenter],
  )

  const resetFilters = useCallback(
    (sportId) => {
      filtersRef.current = defaultFilters
      setFilters(defaultFilters)
      fetchMatches(sportId, defaultFilters)
    },
    [fetchMatches],
  )

  const runProtectedAction = async (action) => {
    if (!isAuthenticated || !token) {
      const message = 'Inicia sesion para realizar esta accion.'
      setError(message)
      notification.info('Inicia sesion para continuar.', 'Accion protegida')
      return null
    }

    setError('')
    try {
      return await action()
    } catch (err) {
      console.error('Error en accion de partidos:', err)
      setError(err.message || 'No se pudo completar la accion.')
      notification.error('No se pudo completar la accion. Intentalo de nuevo.')
      return null
    }
  }

  const createMatch = async (sportId, formData) => {
    return runProtectedAction(async () => {
      await post(
        'partidos',
        {
          ...formData,
          deporte_id: Number(sportId),
          instalacion_id: Number(formData.instalacion_id),
          max_jugadores: Number(formData.max_jugadores),
        },
        token,
      )

      await fetchMatches(sportId)
      notification.success('Tu partido se ha creado correctamente.', 'Partido creado')
      return true
    })
  }

  const createSportCenterMatch = async (sportCenterId, formData) => {
    return runProtectedAction(async () => {
      await post(
        'partidos',
        {
          ...formData,
          deporte_id: Number(formData.deporte_id),
          instalacion_id: Number(sportCenterId),
          max_jugadores: Number(formData.max_jugadores),
        },
        token,
      )

      await fetchMatchesBySportCenter(sportCenterId)
      notification.success('Tu partido se ha creado correctamente.', 'Partido creado')
      return true
    })
  }

  const joinMatch = async (listId, matchId) => {
    await runProtectedAction(async () => {
      await post(`partidos/${matchId}/unirse`, {}, token)
      await refreshCurrentMatches(listId)
      notification.success('Te has unido al partido.', 'Asistencia confirmada')
    })
  }

  const leaveMatch = async (listId, matchId) => {
    await runProtectedAction(async () => {
      const response = await del(`partidos/${matchId}/unirse`, token)
      await refreshCurrentMatches(listId)
      notification.info(
        response?.message || 'Te has desapuntado del partido.',
        'Asistencia cancelada',
      )
    })
  }

  const value = {
    matches,
    filters,
    loading,
    error,
    user,
    fetchMatches,
    fetchMatchesBySportCenter,
    updateFilters,
    updateSportCenterFilters,
    resetFilters,
    resetSportCenterFilters,
    createMatch,
    createSportCenterMatch,
    joinMatch,
    leaveMatch,
  }

  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>
}

export default MatchProvider
export { MatchContext }
