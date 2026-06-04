import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthProvider from '../../../hooks/useAuthProvider.js'
import useNotification from '../../../hooks/useNotification.js'
import { del, get, getApiCollection } from '../../../lib/apiClient.js'
import { formatDate } from '../../../lib/utils.js'

const AdminUsersPage = () => {
  const { token, user } = useAuthProvider()
  const notification = useNotification()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const response = await get('admin/users', token)
      setUsers(getApiCollection(response))
    } catch (err) {
      console.error('Error al cargar usuarios:', err)
      setError('No se pudieron cargar los usuarios.')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const deleteUser = async (selectedUser) => {
    const confirmed = window.confirm(`¿Eliminar al usuario ${selectedUser.name}?`)

    if (!confirmed) {
      return
    }

    try {
      await del(`admin/users/${selectedUser.id}`, token)
      setUsers((current) => current.filter((item) => item.id !== selectedUser.id))
      notification.success('El usuario se ha eliminado correctamente.', 'Usuario eliminado')
    } catch (err) {
      console.error('Error al eliminar usuario:', err)
      notification.error('No se pudo eliminar el usuario.')
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">
                Panel de control
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950">Usuarios</h1>
              <p className="mt-3 text-sm text-slate-600">{users.length} usuarios registrados</p>
            </div>
            <Link
              to="/admin"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 no-underline transition hover:bg-slate-50"
            >
              Volver al panel
            </Link>
          </div>

          {error && (
            <div className="mt-8 rounded-2xl bg-rose-50 p-4 text-sm text-rose-800">{error}</div>
          )}

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4">Usuario</th>
                  <th className="px-5 py-4">Teléfono</th>
                  <th className="px-5 py-4">Rol</th>
                  <th className="px-5 py-4">Registro</th>
                  <th className="px-5 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-10 text-center text-slate-500">
                      Cargando usuarios...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-10 text-center text-slate-500">
                      No hay usuarios registrados.
                    </td>
                  </tr>
                ) : (
                  users.map((item) => {
                    const isCurrentUser = String(item.id) === String(user?.id)

                    return (
                      <tr key={item.id}>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="mt-1 text-slate-500">{item.email}</p>
                        </td>
                        <td className="px-5 py-4 text-slate-600">{item.telefono || 'Sin teléfono'}</td>
                        <td className="px-5 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.rol === 'admin' ? 'bg-[#E6F7D7] text-[#1a2e00]' : 'bg-slate-100 text-slate-700'}`}>
                            {item.rol === 'admin' ? 'Administrador' : 'Usuario'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {formatDate(item.created_at, 'Sin fecha')}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            disabled={isCurrentUser}
                            onClick={() => deleteUser(item)}
                            className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                          >
                            {isCurrentUser ? 'Tu cuenta' : 'Eliminar'}
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminUsersPage
