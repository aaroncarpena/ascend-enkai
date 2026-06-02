import { useContext } from 'react'
import { SportContext } from '../providers/SportProvider'

export const useSport = () => {
  const context = useContext(SportContext)
  
  if (!context) {
    throw new Error('useSport debe ser usado dentro de SportProvider')
  }
  
  return context
}
