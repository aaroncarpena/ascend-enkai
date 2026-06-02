import { useState } from 'react'
import { post } from './useApi.js'

const parseApiError = async (error) => {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}

const useSession = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  const clearSession = () => {
    setToken(null)
    setUser(null)
    setError('')
  }

  const register = async ({ name, email, password, password_verified, telefono }) => {
    try {
      setError('')
      const response = await post('register', {
        name,
        email,
        password,
        password_confirmation: password_verified,
        telefono,
      })
      setToken(response.access_token)
      setUser(response.user)
      return response
    } catch (e) {
      const message = await parseApiError(e)
      setError(message)
      throw new Error(message)
    }
  }

  const login = async ({ login, password }) => {
    try {
      setError('')
      const response = await post('login', { login, password })
      setToken(response.access_token)
      setUser(response.user)
      return response
    } catch (e) {
      const message = await parseApiError(e)
      setError(message)
      throw new Error(message)
    }
  }

  const logout = async () => {
    try {
      setError('')
      if (!token) {
        clearSession()
        return
      }
      await post('logout', {}, token)
      clearSession()
    } catch (e) {
      const message = await parseApiError(e)
      setError(message)
      throw new Error(message)
    }
  }

  return {
    token,
    user,
    error,
    isAuthenticated: Boolean(token),
    register,
    login,
    logout,
    clearSession,
  }
}

export default useSession;

