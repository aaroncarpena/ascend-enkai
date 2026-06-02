import { useContext } from 'react'
import { SportCenterContext } from '../providers/SportCenterProvider'

export const useSportCenter = () => {
  const context = useContext(SportCenterContext)

  if (!context) {
    throw new Error('useSportCenter debe ser usado dentro de SportCenterProvider')
  }

  return context
}
