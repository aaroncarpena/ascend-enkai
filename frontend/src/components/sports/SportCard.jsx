import React from 'react'
import { Link } from 'react-router-dom'
import ModalityBadge from './ModalityBadge.jsx'

const SportCard = ({ sport }) => {
  return (
    <div className="flex h-full min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex min-h-56 min-w-0 w-full flex-col gap-4">
        <div className="min-w-0">
          <h3 className="break-words text-xl font-semibold text-slate-950">{sport.nombre}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{sport.descripcion}</p>
        </div>

        <div className="flex min-w-0 flex-wrap gap-2">
          {sport.modalidades && sport.modalidades.length > 0 ? (
            sport.modalidades.map((mod) => (
              <ModalityBadge key={mod.id} modality={mod} />
            ))
          ) : (
            <span className="text-sm text-slate-500">Sin modalidades configuradas</span>
          )}
        </div>

        <Link
          to={`/deportes/${sport.id}`}
          className="mt-auto box-border inline-flex min-h-10 w-full min-w-0 max-w-full items-center justify-center overflow-hidden rounded-full bg-[#AAED43] px-4 py-2 text-center text-sm font-semibold text-[#1a2e00] transition hover:bg-[#91d236]"
        >
          <span className="truncate">Ver partidos</span>
        </Link>
      </div>
    </div>
  )
}

export default SportCard
