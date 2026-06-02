import React from 'react'

const ReservationCard = ({ sport, venue, date, status, players }) => {
  return (
    <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1F1F1F]/70">{sport}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">{venue}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status === 'Confirmada' ? 'bg-[#E6F7D7] text-[#1a2e00]' : 'bg-[#F5F5F5] text-slate-700'}`}>
          {status}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-6 text-sm text-slate-600">
        <span>{date}</span>
        <span>{players} jugadores</span>
      </div>
    </article>
  )
}

export default ReservationCard
