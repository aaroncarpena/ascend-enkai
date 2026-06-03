import React from 'react'

const formatHour = (hour) => (hour ? hour.slice(0, 5) : '--:--')

const formatDate = (date) => {
  if (!date) {
    return 'Fecha pendiente'
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

const ReservationCard = ({ match, onLeave }) => {
  const isFull = Number(match.jugadores_actuales) >= Number(match.max_jugadores)

  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1F1F1F]/70">
            {match.deporte?.nombre || 'Deporte'}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">
            {match.instalacion?.nombre || 'Instalación pendiente'}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {match.instalacion?.direccion || 'Dirección no disponible'}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isFull ? 'bg-slate-100 text-slate-700' : 'bg-[#E6F7D7] text-[#1a2e00]'}`}>
          {isFull ? 'Cupo lleno' : 'Confirmado'}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Fecha</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{formatDate(match.fecha)}</p>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Hora</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {formatHour(match.hora_inicio)} - {formatHour(match.hora_fin)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Jugadores</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {match.jugadores_actuales}/{match.max_jugadores}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Creado por {match.creador?.name || 'usuario desconocido'}
        </p>
        <button
          type="button"
          onClick={onLeave}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancelar asistencia
        </button>
      </div>
    </article>
  )
}

export default ReservationCard
