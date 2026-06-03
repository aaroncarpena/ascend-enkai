import React, { useCallback, useRef, useState } from 'react'
import useAuthProvider from '../hooks/useAuthProvider'
import { useApi } from '../hooks/useApi'
import { MatchContext, defaultFilters } from './matchContext'

const buildQuery = (filters) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value)
    }
  })

  const query = params.toString()
  return query ? `?${query}` : ''
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
  const [myMatches, setMyMatches] = useState([])
  const [filters, setFilters] = useState(defaultFilters)
  const filtersRef = useRef(defaultFilters)
  const currentListRef = useRef({ type: 'sport', id: null })
  const [loading, setLoading] = useState(false)
  const [myMatchesLoading, setMyMatchesLoading] = useState(false)
  const [error, setError] = useState('')
  const [myMatchesError, setMyMatchesError] = useState('')
  const { get, post, del } = useApi()
  const { token, user, isAuthenticated } = useAuthProvider()

  const fetchMatches = useCallback(
    async (sportId, nextFilters = filtersRef.current) => {
      const sportFilters = clearSportFromFilters(nextFilters)
      currentListRef.current = { type: 'sport', id: sportId }
      setLoading(true)
      setError('')

      try {
        const response = await get(`deportes/${sportId}/partidos${buildQuery(sportFilters)}`)
        setMatches(Array.isArray(response) ? response : response?.data || [])
      } catch (err) {
        console.error('Error al cargar partidos:', err)
        setError('No se pudieron cargar los partidos.')
      } finally {
        setLoading(false)
      }
    },
    [get],
  )

  const fetchMatchesBySportCenter = useCallback(
    async (sportCenterId, nextFilters = filtersRef.current) => {
      const sportCenterFilters = clearSportCenterFromFilters(nextFilters)
      currentListRef.current = { type: 'sportCenter', id: sportCenterId }
      setLoading(true)
      setError('')

      try {
        const response = await get(`instalacion/${sportCenterId}/partidos${buildQuery(sportCenterFilters)}`)
        setMatches(Array.isArray(response) ? response : response?.data || [])
      } catch (err) {
        console.error('Error al cargar partidos de la instalación:', err)
        setError('No se pudieron cargar los partidos.')
      } finally {
        setLoading(false)
      }
    },
    [get],
  )

  const refreshCurrentMatches = useCallback(async () => {
    const currentList = currentListRef.current

    if (!currentList.id) {
      return
    }

    if (currentList.type === 'sportCenter') {
      await fetchMatchesBySportCenter(currentList.id)
      return
    }

    await fetchMatches(currentList.id)
  }, [fetchMatches, fetchMatchesBySportCenter])

  const updateFilters = useCallback(
    (sportId, nextFilters) => {
      const sportFilters = clearSportFromFilters(nextFilters)
      filtersRef.current = sportFilters
      setFilters(sportFilters)
      fetchMatches(sportId, sportFilters)
    },
    [fetchMatches],
  )

  const updateSportCenterFilters = useCallback(
    (sportCenterId, nextFilters) => {
      const sportCenterFilters = clearSportCenterFromFilters(nextFilters)
      filtersRef.current = sportCenterFilters
      setFilters(sportCenterFilters)
      fetchMatchesBySportCenter(sportCenterId, sportCenterFilters)
    },
    [fetchMatchesBySportCenter],
  )

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

  const runProtectedAction = useCallback(
    async (action) => {
      if (!isAuthenticated || !token) {
        const message = 'Inicia sesión para realizar esta acción.'
        setError(message)
        return null
      }

      setError('')
      try {
        return await action()
      } catch (err) {
        console.error('Error en acción de partidos:', err)
        setError(err.message || 'No se pudo completar la acción.')
        return null
      }
    },
    [isAuthenticated, token],
  )

  const fetchMyMatches = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setMyMatches([])
      return
    }

    setMyMatchesLoading(true)
    setMyMatchesError('')

    try {
      const response = await get('mis-partidos', token)
      setMyMatches(Array.isArray(response) ? response : response?.data || [])
    } catch (err) {
      console.error('Error al cargar mis partidos:', err)
      setMyMatchesError('No se pudieron cargar tus partidos.')
    } finally {
      setMyMatchesLoading(false)
    }
  }, [get, isAuthenticated, token])

  const createMatch = useCallback(
    async (sportId, formData) => {
      await runProtectedAction(async () => {
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
        await fetchMyMatches()
      })
    },
    [fetchMatches, fetchMyMatches, post, runProtectedAction, token],
  )

  const createSportCenterMatch = useCallback(
    async (sportCenterId, formData) => {
      await runProtectedAction(async () => {
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
        await fetchMyMatches()
      })
    },
    [fetchMatchesBySportCenter, fetchMyMatches, post, runProtectedAction, token],
  )

  const joinMatch = useCallback(
    async (listId, matchId) => {
      await runProtectedAction(async () => {
        await post(`partidos/${matchId}/unirse`, {}, token)
        await refreshCurrentMatches(listId)
        await fetchMyMatches()
      })
    },
    [fetchMyMatches, post, refreshCurrentMatches, runProtectedAction, token],
  )

  const leaveMatch = useCallback(
    async (listId, matchId) => {
      await runProtectedAction(async () => {
        await del(`partidos/${matchId}/unirse`, token)
        await refreshCurrentMatches(listId)
        await fetchMyMatches()
      })
    },
    [del, fetchMyMatches, refreshCurrentMatches, runProtectedAction, token],
  )

  const value = {
    matches,
    myMatches,
    filters,
    loading,
    myMatchesLoading,
    error,
    myMatchesError,
    user,
    fetchMatches,
    fetchMatchesBySportCenter,
    fetchMyMatches,
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
