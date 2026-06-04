import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthProvider from '../../../hooks/useAuthProvider.js'
import useNotification from '../../../hooks/useNotification.js'
import { del, get, getApiCollection, post, put } from '../../../lib/apiClient.js'
import AdminSportCenterForm from './AdminSportCenterForm.jsx'

const AdminSportCentersPage = () => {
  const { token } = useAuthProvider()
  const notification = useNotification()
  const [centers, setCenters] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingCenter, setEditingCenter] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const [centersResponse, municipiosResponse] = await Promise.all([
        get('admin/instalaciones', token),
        get('municipios'),
      ])

      setCenters(getApiCollection(centersResponse))
      setMunicipios(getApiCollection(municipiosResponse))
    } catch (err) {
      console.error('Error al cargar instalaciones:', err)
      setError('No se pudieron cargar las instalaciones.')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const closeForm = () => {
    setEditingCenter(null)
    setShowForm(false)
  }

  const createCenter = () => {
    setEditingCenter(null)
    setShowForm(true)
  }

  const editCenter = (center) => {
    setEditingCenter(center)
    setShowForm(true)
  }

  const saveCenter = async (formData) => {
    try {
      if (editingCenter) {
        await put(`admin/instalaciones/${editingCenter.id}`, formData, token)
        notification.success('La instalación se ha actualizado.', 'Instalación actualizada')
      } else {
        await post('admin/instalaciones', formData, token)
        notification.success('La instalación se ha creado.', 'Instalación creada')
      }

      closeForm()
      await fetchData()
    } catch (err) {
      console.error('Error al guardar instalación:', err)
      notification.error('Revisa los datos de la instalación.', 'No se pudo guardar')
    }
  }

  const deleteCenter = async (center) => {
    const confirmed = window.confirm(
      `¿Eliminar ${center.nombre}? También se eliminarán sus partidos relacionados.`,
    )

    if (!confirmed) {
      return
    }

    try {
      await del(`admin/instalaciones/${center.id}`, token)
      setCenters((current) => current.filter((item) => item.id !== center.id))
      notification.success('La instalación se ha eliminado.', 'Instalación eliminada')
    } catch (err) {
      console.error('Error al eliminar instalación:', err)
      notification.error('No se pudo eliminar la instalación.')
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">
                Panel de control
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950">Instalaciones</h1>
              <p className="mt-3 text-sm text-slate-600">{centers.length} instalaciones registradas</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 no-underline transition hover:bg-slate-50"
              >
                Volver al panel
              </Link>
              <button
                type="button"
                onClick={createCenter}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#AAED43] px-5 text-sm font-semibold text-[#1a2e00] transition hover:bg-[#91d236]"
              >
                <i className="pi pi-plus" aria-hidden="true" />
                Nueva instalación
              </button>
            </div>
          </div>

          {showForm && (
            <div className="mt-8">
              <AdminSportCenterForm
                center={editingCenter}
                municipios={municipios}
                onSubmit={saveCenter}
                onCancel={closeForm}
              />
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-2xl bg-rose-50 p-4 text-sm text-rose-800">{error}</div>
          )}

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {loading ? (
              [...Array(4)].map((_, index) => (
                <div key={index} className="h-52 rounded-2xl bg-slate-200 animate-pulse" />
              ))
            ) : centers.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center md:col-span-2">
                <p className="text-sm text-slate-600">No hay instalaciones registradas.</p>
              </div>
            ) : (
              centers.map((center) => (
                <article key={center.id} className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
                  <h2 className="text-xl font-semibold text-slate-950">{center.nombre}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{center.direccion}</p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Municipio</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {center.municipio?.nombre || 'No disponible'}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Horario</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {center.horario_apertura?.slice(0, 5)} - {center.horario_clausura?.slice(0, 5)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => editCenter(center)}
                      className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCenter(center)}
                      className="inline-flex min-h-10 items-center justify-center rounded-xl border border-rose-200 px-4 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminSportCentersPage
