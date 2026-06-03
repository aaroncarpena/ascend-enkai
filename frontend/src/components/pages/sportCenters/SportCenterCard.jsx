import React from 'react'
import { Link } from 'react-router-dom'

const SportCenterCard = ({ center }) => {
  const opening = center.horario_apertura || '00:00'
  const closing = center.horario_clausura || '00:00'

  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-950">{center.nombre}</h2>
      </div>

      <p className="text-sm leading-6 text-slate-600">{center.direccion}</p>

      <div className="mt-6 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <span className="font-medium text-slate-800">Horario</span>
          <span>{opening} - {closing}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <span className="font-medium text-slate-800">Municipio</span>
          <span>{center.municipio?.nombre || 'No disponible'}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <span className="font-medium text-slate-800">Provincia</span>
          <span>{center.municipio?.provincia?.nombre || 'No disponible'}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          to={`/instalacion/${center.id}`}
          className="inline-flex min-h-11 w-full max-w-48 items-center justify-center rounded-xl bg-[#AAED43] px-4 text-sm font-semibold text-[#1a2e00] no-underline transition hover:bg-[#91d236]"
        >
          Ver partidos
        </Link>
      </div>
    </article>
  )
}

export default SportCenterCard
