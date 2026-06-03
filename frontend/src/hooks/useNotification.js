import { useContext } from 'react'
import { NotificationContext } from '../providers/notificationContext.js'

const useNotification = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error('useNotification debe usarse dentro de NotificationProvider')
  }

  return context
}

export default useNotification
