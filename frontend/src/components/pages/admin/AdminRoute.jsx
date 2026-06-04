import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthProvider from '../../../hooks/useAuthProvider.js'

const AdminRoute = () => {
  const { user, isAuthenticated } = useAuthProvider()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.rol !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default AdminRoute
