import React, { createContext, useCallback } from 'react'
import useSession from '../hooks/useSession.js'
import useNotification from '../hooks/useNotification.js'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const defaultDataSesion = {
    name: '',
    email: '',
    password: '',
    password_verified: '',
    telefono: '',
  }

  const session = useSession()
  const notification = useNotification()
  const {
    loadProfile: loadProfileSession,
    saveProfile: saveProfileSession,
    uploadAvatar: uploadAvatarSession,
  } = session

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

  const loadProfile = useCallback(async () => {
    try {
      return await loadProfileSession()
    } catch (error) {
      console.error('Error al cargar perfil:', error)
      notification.error('No se pudo cargar tu perfil.')
      return null
    }
  }, [loadProfileSession, notification])

  const saveProfile = useCallback(
    async (data) => {
      try {
        const response = await saveProfileSession(data)
        notification.success('Tu perfil se ha actualizado correctamente.', 'Perfil actualizado')
        return response
      } catch (error) {
        console.error('Error al guardar perfil:', error)
        notification.error('No se pudo guardar el perfil. Revisa los datos.')
        return null
      }
    },
    [notification, saveProfileSession],
  )

  const uploadAvatar = async (file) => {
    try {
      const response = await uploadAvatarSession(file)

      if (response) {
        notification.success('Tu avatar se ha actualizado correctamente.', 'Avatar actualizado')
      }

      return response
    } catch (error) {
      console.error('Error al subir avatar:', error)
      notification.error('Usa JPG, PNG o WebP de menos de 4 MB.', 'No se pudo subir la imagen')
      return null
    }
  }

  const value = {
    defaultDataSesion,
    ...session,
    register,
    login,
    logout,
    loadProfile,
    saveProfile,
    uploadAvatar,
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext }

