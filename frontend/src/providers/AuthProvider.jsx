import React from 'react'
import useSession from '../hooks/useSession.js'
import useNotification from '../hooks/useNotification.js'
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
  const notification = useNotification()

  const register = async (data) => {
    try {
      const response = await session.register(data)
      notification.success('Tu cuenta se ha creado correctamente.', 'Registro completado')
      return response
    } catch (error) {
      notification.error('Revisa los datos e intentalo de nuevo.', 'No se pudo registrar')
      throw error
    }
  }

  const login = async (data) => {
    try {
      const response = await session.login(data)
      notification.success(`Bienvenido${response.user?.name ? `, ${response.user.name}` : ''}.`, 'Sesion iniciada')
      return response
    } catch (error) {
      notification.error('Usuario, correo o contrasena incorrectos.', 'No se pudo iniciar sesion')
      throw error
    }
  }

  const logout = async () => {
    try {
      await session.logout()
      notification.info('Has cerrado sesion correctamente.', 'Sesion cerrada')
    } catch (error) {
      notification.error('No se pudo cerrar la sesion.', 'Error')
      throw error
    }
  }

  const value = {
    defaultDataSesion,
    ...session,
    register,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider

