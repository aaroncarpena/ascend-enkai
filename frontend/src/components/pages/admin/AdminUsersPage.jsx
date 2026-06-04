import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthProvider from '../../../hooks/useAuthProvider.js'
import useNotification from '../../../hooks/useNotification.js'
import { del, get, getApiCollection, patch } from '../../../lib/apiClient.js'
import { formatDate } from '../../../lib/utils.js'

const AdminUsersPage = () => {
  const { token, user } = useAuthProvider()
  const notification = useNotification()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmingUserId, setConfirmingUserId] = useState(null)
  const [deletingUserId, setDeletingUserId] = useState(null)
  const [changingRoleUserId, setChangingRoleUserId] = useState(null)

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
    setDeletingUserId(selectedUser.id)

    try {
      await del(`admin/users/${selectedUser.id}`, token)
      setUsers((current) => current.filter((item) => item.id !== selectedUser.id))
      notification.success('El usuario se ha eliminado correctamente.', 'Usuario eliminado')
    } catch (err) {
      console.error('Error al eliminar usuario:', err)
      notification.error('No se pudo eliminar el usuario.')
    } finally {
      setConfirmingUserId(null)
      setDeletingUserId(null)
    }
  }

  const changeRole = async (selectedUser, rol) => {
    setChangingRoleUserId(selectedUser.id)

    try {
      const updatedUser = await patch(`admin/users/${selectedUser.id}/role`, { rol }, token)
      setUsers((current) => current.map((item) => (
        item.id === selectedUser.id ? { ...item, rol: updatedUser.rol } : item
      )))
      notification.success('El rol del usuario se ha actualizado.', 'Rol actualizado')
    } catch (err) {
      console.error('Error al cambiar rol:', err)
      notification.error('No se pudo cambiar el rol del usuario.')
    } finally {
      setChangingRoleUserId(null)
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
                          <select
                            value={item.rol}
                            disabled={isCurrentUser || changingRoleUserId === item.id}
                            onChange={(event) => changeRole(item, event.target.value)}
                            className={`min-h-9 rounded-xl border px-3 text-xs font-semibold outline-none transition focus:border-[#AAED43] disabled:cursor-not-allowed disabled:opacity-60 ${item.rol === 'admin' ? 'border-[#AAED43] bg-[#E6F7D7] text-[#1a2e00]' : 'border-slate-200 bg-slate-100 text-slate-700'}`}
                            aria-label={`Cambiar rol de ${item.name}`}
                          >
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                          </select>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {formatDate(item.created_at, 'Sin fecha')}
                        </td>
                        <td className="px-5 py-4 text-right">
                          {confirmingUserId === item.id ? (
                            <div className="flex items-center justify-end gap-2">
                              <span className="text-xs font-medium text-rose-700">¿Eliminar?</span>
                              <button
                                type="button"
                                disabled={deletingUserId === item.id}
                                onClick={() => deleteUser(item)}
                                className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
                              >
                                {deletingUserId === item.id ? 'Eliminando...' : 'Confirmar'}
                              </button>
                              <button
                                type="button"
                                disabled={deletingUserId === item.id}
                                onClick={() => setConfirmingUserId(null)}
                                className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              disabled={isCurrentUser}
                              onClick={() => setConfirmingUserId(item.id)}
                              className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
                            >
                              {isCurrentUser ? 'Tu cuenta' : 'Eliminar'}
                            </button>
                          )}
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
