import React from 'react'

const PlayerList = ({ players }) => {
  const activePlayers = players.filter((player) => player.pivot?.estado !== 'cancelado')

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-900">Jugadores unidos</p>

      {activePlayers.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">Todavía no hay jugadores unidos.</p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {activePlayers.map((player) => (
            <span
              key={player.id}
              className="inline-flex max-w-full items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700"
            >
              <span className="truncate">{player.name}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default PlayerList
