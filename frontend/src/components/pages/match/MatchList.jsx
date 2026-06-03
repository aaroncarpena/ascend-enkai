import React from 'react'
import MatchCard from './MatchCard.jsx'

const MatchList = ({
  loading,
  matches,
  user,
  showAddress = true,
  showSport = false,
  showVenueName = true,
  onJoin,
  onLeave,
}) => {
  if (loading) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-72 rounded-2xl bg-slate-200 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-600">No hay partidos disponibles con esos filtros.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          user={user}
          showAddress={showAddress}
          showSport={showSport}
          showVenueName={showVenueName}
          onJoin={onJoin}
          onLeave={onLeave}
        />
      ))}
    </div>
  )
}

export default MatchList
