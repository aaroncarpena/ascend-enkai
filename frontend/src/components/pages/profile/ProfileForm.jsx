import React, { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { findById, getInitial } from '../../../lib/utils.js'

const getFormValues = (profile) => ({
  name: profile?.name || '',
  email: profile?.email || '',
  telefono: profile?.telefono || '',
  municipio_id: profile?.perfil?.municipio_id || '',
  deporteFavorito: profile?.perfil?.deporteFavorito || '',
})

const ProfileForm = ({ profile, municipios, sports, uploadingAvatar, onAvatarUpload, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({ defaultValues: getFormValues(profile) })

  useEffect(() => {
    reset(getFormValues(profile))
  }, [profile, reset])

  const name = useWatch({ control, name: 'name' })
  const municipioId = useWatch({ control, name: 'municipio_id' })
  const selectedMunicipio = findById(municipios, municipioId)
  const provinceName = selectedMunicipio?.provincia?.nombre || 'Selecciona un municipio.'
  const avatar = profile?.perfil?.avatar
  const uploadButtonClass = [
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition',
    uploadingAvatar ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-[#AAED43]',
  ].join(' ')

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    onAvatarUpload(file)
    event.target.value = ''
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Usuario
          <input
            required
            type="text"
            maxLength={255}
            autoComplete="username"
            {...register('name')}
            className="min-h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Correo electrónico
          <input
            required
            type="email"
            maxLength={255}
            autoComplete="email"
            {...register('email')}
            className="min-h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Teléfono
          <input
            type="tel"
            inputMode="numeric"
            required
            pattern="[0-9]{9}"
            maxLength={9}
            title="Introduce exactamente 9 números."
            autoComplete="tel"
            {...register('telefono')}
            className="min-h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Deporte favorito
          <select
            {...register('deporteFavorito')}
            className="min-h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          >
            <option value="">Sin favorito</option>
            {sports.map((sport) => (
              <option key={sport.id} value={sport.nombre}>
                {sport.nombre}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          Avatar
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar actual"
                  className="h-16 w-16 rounded-full border border-slate-200 bg-white object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#AAED43] text-xl font-bold text-[#1a2e00]">
                  {getInitial(name)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-slate-900">{name || 'Usuario'}</p>
                <p className="text-xs font-normal text-slate-500">JPG, PNG o WebP. Máximo 4 MB.</p>
              </div>
            </div>

            <label className={uploadButtonClass}>
              <i className="pi pi-upload text-sm" aria-hidden="true" />
              {uploadingAvatar ? 'Subiendo...' : 'Subir imagen'}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={uploadingAvatar}
                onChange={handleAvatarChange}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Municipio
          <select
            {...register('municipio_id')}
            className="min-h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          >
            <option value="">Sin municipio</option>
            {municipios.map((municipio) => (
              <option key={municipio.id} value={municipio.id}>
                {municipio.nombre}
                {municipio.provincia?.nombre ? `, ${municipio.provincia.nombre}` : ''}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Provincia
          <input
            type="text"
            value={provinceName}
            readOnly
            className="min-h-11 rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm text-slate-700 outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#AAED43] px-5 text-sm font-semibold text-[#1a2e00] transition hover:bg-[#91d236] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          <i className="pi pi-save text-sm" aria-hidden="true" />
          {isSubmitting ? 'Guardando...' : 'Guardar perfil'}
        </button>
      </div>
    </form>
  )
}

export default ProfileForm
