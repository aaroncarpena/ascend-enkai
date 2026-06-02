import React from 'react'
import { Link } from 'react-router-dom'
import ModalityBadge from './ModalityBadge.jsx'

const SportCard = ({ sport }) => {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-950">{sport.nombre}</h3>
          <p className="mt-2 text-sm text-slate-600">{sport.descripcion}</p>
        </div>

        <div className="flex flex-wrap gap-2">
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
          className="inline-flex w-full items-center justify-center rounded-full bg-[#AAED43] px-4 py-2 text-sm font-semibold text-[#1a2e00] transition hover:bg-[#91d236]"
        >
          Ver partidos
        </Link>
      </div>
    </div>
  )
}

export default SportCard
