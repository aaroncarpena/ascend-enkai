import { useContext } from 'react'
import { MatchContext } from '../providers/MatchProvider.jsx'

export const useMatch = () => {
  const context = useContext(MatchContext)

  if (!context) {
    console.debug('useMatch: MatchProvider no esta disponible.')
  }

  return context
}
