import React from 'react'
import { formatDate, formatTime } from '../../../lib/utils.js'
import PlayerList from './PlayerList.jsx'

const MatchCard = ({
  match,
  user,
  showAddress = true,
  showSport = false,
  showVenueName = true,
  onJoin,
  onLeave,
}) => {
  const players = match.jugadores || []
  const currentUserId = String(user?.id || '')
  const isJoined = players.some((player) => String(player.id) === currentUserId && player.pivot?.estado !== 'cancelado')
  const isFull = Number(match.jugadores_actuales) >= Number(match.max_jugadores)

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {match.nivel || 'Nivel abierto'}
            {showSport && showVenueName && match.deporte?.nombre ? ` / ${match.deporte.nombre}` : ''}
          </p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            {showVenueName
              ? match.instalacion?.nombre || 'Instalación pendiente'
              : match.deporte?.nombre || 'Deporte'}
          </h2>
          {showAddress && (
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {match.instalacion?.direccion || 'Dirección no disponible'}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Fecha</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {formatDate(match.fecha, 'Fecha pendiente')}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Hora</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {formatTime(match.hora_inicio)} - {formatTime(match.hora_fin)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Jugadores</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {match.jugadores_actuales}/{match.max_jugadores}
          </p>
        </div>
      </div>

      {match.descripcion && (
        <p className="mt-5 text-sm leading-6 text-slate-600">{match.descripcion}</p>
      )}

      <div className="mt-5 rounded-xl border border-slate-100 bg-white p-4">
        <p className="text-sm font-semibold text-slate-900">Creador</p>
        <p className="mt-1 text-sm text-slate-600">{match.creador?.name || 'Usuario desconocido'}</p>
      </div>

      <div className="mt-4">
        <PlayerList players={players} />
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row">
        {isJoined ? (
          <button
            type="button"
            onClick={() => onLeave(match.id)}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar asistencia
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onJoin(match.id)}
            disabled={isFull}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#AAED43] px-4 text-sm font-semibold text-[#1a2e00] transition hover:bg-[#91d236] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          >
            {isFull ? 'Cupo lleno' : 'Unirse'}
          </button>
        )}
      </div>
    </article>
  )
}

export default MatchCard
