import React from 'react'

const getInitial = (name = '') => (name.trim()[0] || 'U').toUpperCase()

const ProfileForm = ({ form, municipios, sports, saving, uploadingAvatar, onChange, onAvatarUpload, onSubmit }) => {
  const selectedMunicipio = municipios.find((municipio) => String(municipio.id) === String(form.municipio_id))
  const provinceName = selectedMunicipio?.provincia?.nombre || 'Selecciona un municipio.'
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
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Usuario
          <input
            required
            type="text"
            value={form.name}
            onChange={(event) => onChange('name', event.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Correo electrónico
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => onChange('email', event.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Teléfono
          <input
            type="tel"
            value={form.telefono}
            onChange={(event) => onChange('telefono', event.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Deporte favorito
          <select
            value={form.deporteFavorito}
            onChange={(event) => onChange('deporteFavorito', event.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          >
            <option value="">Sin favorito</option>
            {sports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          Avatar
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {form.avatar ? (
                <img
                  src={form.avatar}
                  alt="Avatar actual"
                  className="h-16 w-16 rounded-full border border-slate-200 bg-white object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#AAED43] text-xl font-bold text-[#1a2e00]">
                  {getInitial(form.name)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-slate-900">{form.name || 'Usuario'}</p>
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
            value={form.municipio_id}
            onChange={(event) => onChange('municipio_id', event.target.value)}
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
          disabled={saving}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#AAED43] px-5 text-sm font-semibold text-[#1a2e00] transition hover:bg-[#91d236] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          <i className="pi pi-save text-sm" aria-hidden="true" />
          {saving ? 'Guardando...' : 'Guardar perfil'}
        </button>
      </div>
    </form>
  )
}

export default ProfileForm
