import { useCallback, useState } from 'react'
import { get, post, postForm, put } from '../lib/apiClient.js'
import { getErrorMessage } from '../lib/utils.js'

const useSession = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [profileLoading, setProfileLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  const clearSession = () => {
    setToken(null)
    setUser(null)
    setError('')
  }

  const register = async ({ name, email, password, password_verified, telefono, account_type, installation }) => {
    try {
      setError('')
      const response = await post('register', {
        name,
        email,
        password,
        password_confirmation: password_verified,
        telefono,
        account_type,
        installation,
      })
      setToken(response.access_token)
      setUser(response.user)
      return response
    } catch (e) {
      const message = getErrorMessage(e)
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
      const message = getErrorMessage(e)
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
      const message = getErrorMessage(e)
      setError(message)
      throw new Error(message)
    }
  }

  const loadProfile = useCallback(async () => {
    if (!token) {
      return null
    }

    setProfileLoading(true)

    try {
      const response = await get('perfil', token)
      setUser(response)
      return response
    } finally {
      setProfileLoading(false)
    }
  }, [token])

  const saveProfile = useCallback(
    async (formData) => {
      const response = await put(
        'perfil',
        {
          ...formData,
          avatar: user?.perfil?.avatar,
          municipio_id: formData.municipio_id || null,
        },
        token,
      )

      setUser(response)
      return response
    },
    [token, user?.perfil?.avatar],
  )

  const uploadAvatar = useCallback(
    async (file) => {
      if (!file) {
        return null
      }

      const data = new FormData()
      data.append('avatar', file)
      setUploadingAvatar(true)

      try {
        const response = await postForm('perfil/avatar', data, token)
        setUser(response)
        return response
      } finally {
        setUploadingAvatar(false)
      }
    },
    [token],
  )

  return {
    token,
    user,
    error,
    profileLoading,
    uploadingAvatar,
    isAuthenticated: Boolean(token),
    register,
    login,
    logout,
    clearSession,
    loadProfile,
    saveProfile,
    uploadAvatar,
  }
}

export default useSession;

