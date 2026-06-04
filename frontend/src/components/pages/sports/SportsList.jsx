import React from 'react'
import SportCard from './SportCard.jsx'

const SportsList = ({ sports, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[repeat(3,minmax(0,1fr))]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 rounded-[1.5rem] bg-slate-200 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!sports || sports.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-slate-600">No hay deportes disponibles.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[repeat(3,minmax(0,1fr))]">
      {sports.map((sport) => (
        <SportCard key={sport.id} sport={sport} />
      ))}
    </div>
  )
}

export default SportsList
