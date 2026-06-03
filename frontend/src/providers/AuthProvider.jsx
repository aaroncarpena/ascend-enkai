import React from 'react'
import useSession from '../hooks/useSession.js'
import { AuthContext } from './authContext.js'

const AuthProvider = ({ children }) => {
  const defaultDataSesion = {
    name: '',
    email: '',
    password: '',
    password_verified: '',
    telefono: '',
    account_type: 'user',
    installation: {
      nombre: '',
      direccion: '',
      municipio_id: '',
      horario_apertura: '',
      horario_clausura: '',
    },
  }

  const session = useSession()

  const value = {
    defaultDataSesion,
    ...session,
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

