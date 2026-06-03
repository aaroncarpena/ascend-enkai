import { createContext } from 'react'

const MatchContext = createContext()

const defaultFilters = {
  nivel: '',
  fecha: '',
  deporte_id: '',
  instalacion_id: '',
}

export { MatchContext, defaultFilters }
