import React, { createContext } from 'react'
import useSession from '../hooks/useSession.js'

const authProvider = createContext()
const AuthProvider = ({ children }) => {
  const defaultDataSesion = {
    name: '',
    email: '',
    password: '',
    password_verified: '',
    telefono: '',
  }

  const session = useSession()

  const value = {
    defaultDataSesion,
    ...session,
  }

  return (
    <authProvider.Provider value={value}>{children}</authProvider.Provider>
  )
}

export default AuthProvider
export { authProvider }

