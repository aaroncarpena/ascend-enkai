import React from 'react'

const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return (parts[0]?.[0] || 'U').toUpperCase()
}

const ProfileSummary = ({ profile }) => {
  const perfil = profile?.perfil
  const avatar = perfil?.avatar

  return (
    <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left">
      <div className="flex flex-col items-center text-center">
        {avatar ? (
          <img
            src={avatar}
            alt={profile?.name || 'Usuario'}
            className="h-28 w-28 rounded-full border border-slate-200 bg-white object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#AAED43] text-3xl font-bold text-[#1a2e00]">
            {getInitials(profile?.name)}
          </div>
        )}

        <h2 className="mt-5 text-2xl font-bold text-slate-950">{profile?.name || 'Usuario'}</h2>
        <p className="mt-1 text-sm text-slate-600">{profile?.email || 'Correo electrónico no disponible.'}</p>
      </div>

      <div className="mt-6 space-y-3">
        <div className="rounded-xl bg-white px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Teléfono</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{profile?.telefono || 'No indicado'}</p>
        </div>
        <div className="rounded-xl bg-white px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Municipio</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{perfil?.municipio?.nombre || 'No indicado'}</p>
        </div>
        <div className="rounded-xl bg-white px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Provincia</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {perfil?.municipio?.provincia?.nombre || perfil?.provincia?.nombre || 'No indicada'}
          </p>
        </div>
        <div className="rounded-xl bg-white px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Deporte favorito</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{perfil?.deporteFavorito || 'No indicado'}</p>
        </div>
      </div>
    </aside>
  )
}

export default ProfileSummary
