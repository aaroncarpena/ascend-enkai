import React from 'react'
import SportCard from './SportCard.jsx'

const SportsList = ({ sports, loading }) => {
  if (loading) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 rounded-[1.5rem] bg-slate-200 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!sports || sports.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-slate-600">No hay deportes disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {sports.map((sport) => (
        <SportCard key={sport.id} sport={sport} />
      ))}
    </div>
  )
}

export default SportsList
