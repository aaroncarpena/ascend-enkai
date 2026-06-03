import React, { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import useAuthProvider from '../../../hooks/useAuthProvider.js'
import { useApi } from '../../../hooks/useApi.js'

const SignUp = () => {
  const { defaultDataSesion, register: registerUser, error } = useAuthProvider()
  const { get } = useApi()
  const [municipios, setMunicipios] = useState([])
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({ defaultValues: defaultDataSesion })

  const accountType = useWatch({ control, name: 'account_type' })
  const municipioId = useWatch({ control, name: 'installation.municipio_id' })

  useEffect(() => {
    const loadMunicipios = async () => {
      try {
        const data = await get('municipios')
        setMunicipios(Array.isArray(data) ? data : data?.data || [])
      } catch (err) {
        console.error('Error al cargar municipios:', err)
      }
    }

    loadMunicipios()
  }, [get])

  const selectedMunicipio = useMemo(() => {
    return municipios.find((municipio) => String(municipio.id) === String(municipioId))
  }, [municipioId, municipios])

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        installation: data.account_type === 'instalacion' ? data.installation : undefined,
      }

      await registerUser(payload)
      reset(defaultDataSesion)
    } catch (e) {
      console.error('Registro fallido:', e)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl rounded-[2rem] border border-[#E5E7EB] bg-white p-8 shadow-xl sm:p-10">
        <h2 className="mb-6 text-3xl font-semibold text-[#1F1F1F]">Crear cuenta</h2>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
          <label className="grid gap-2 text-sm font-medium text-[#1F1F1F]">
            Tipo de cuenta
            <select
              {...register('account_type')}
              className="min-h-11 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-4 text-sm text-[#1F1F1F] outline-none transition-colors duration-150 focus:border-[#AAED43]"
            >
              <option value="user">Usuario normal</option>
              <option value="instalacion">Instalación</option>
            </select>
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[#1F1F1F]">
              Usuario
              <input
                {...register('name')}
                type="text"
                placeholder="Introduce tu usuario."
                className="min-h-11 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-4 text-sm text-[#1F1F1F] outline-none transition-colors duration-150 focus:border-[#AAED43]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#1F1F1F]">
              Correo electrónico
              <input
                {...register('email')}
                type="email"
                placeholder="Introduce tu correo electrónico."
                className="min-h-11 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-4 text-sm text-[#1F1F1F] outline-none transition-colors duration-150 focus:border-[#AAED43]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#1F1F1F]">
              Teléfono
              <input
                {...register('telefono')}
                type="tel"
                placeholder="Introduce tu teléfono."
                className="min-h-11 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-4 text-sm text-[#1F1F1F] outline-none transition-colors duration-150 focus:border-[#AAED43]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#1F1F1F]">
              Contraseña
              <input
                {...register('password')}
                type="password"
                placeholder="Introduce tu contraseña."
                className="min-h-11 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-4 text-sm text-[#1F1F1F] outline-none transition-colors duration-150 focus:border-[#AAED43]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#1F1F1F] md:col-span-2">
              Confirmar contraseña
              <input
                {...register('password_verified')}
                type="password"
                placeholder="Repite tu contraseña."
                className="min-h-11 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-4 text-sm text-[#1F1F1F] outline-none transition-colors duration-150 focus:border-[#AAED43]"
              />
            </label>
          </div>

          {accountType === 'instalacion' && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-950">Datos de la instalación</h3>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Nombre
                  <input
                    {...register('installation.nombre')}
                    type="text"
                    placeholder="Centro deportivo..."
                    className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Municipio
                  <select
                    {...register('installation.municipio_id')}
                    className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
                  >
                    <option value="">Selecciona un municipio</option>
                    {municipios.map((municipio) => (
                      <option key={municipio.id} value={municipio.id}>
                        {municipio.nombre}
                        {municipio.provincia?.nombre ? `, ${municipio.provincia.nombre}` : ''}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
                  Dirección
                  <input
                    {...register('installation.direccion')}
                    type="text"
                    placeholder="Calle, número, zona..."
                    className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Provincia
                  <input
                    type="text"
                    value={selectedMunicipio?.provincia?.nombre || 'Selecciona un municipio.'}
                    readOnly
                    className="min-h-11 rounded-xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-700 outline-none"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Apertura
                  <input
                    {...register('installation.horario_apertura')}
                    type="time"
                    className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Cierre
                  <input
                    {...register('installation.horario_clausura')}
                    type="time"
                    className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
                  />
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-[#AAED43] px-4 py-3 text-sm font-semibold text-[#1a2e00] transition-colors duration-150 hover:bg-[#1F1F1F] hover:text-[#AAED43] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
