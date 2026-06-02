import React from 'react'
import ReservationCard from './ReservationCard.jsx'

const reservations = [
  {
    sport: 'Fútbol 7',
    venue: 'Cancha Central - Parque Verde',
    date: 'Sábado 7 jun • 18:30',
    status: 'Confirmada',
    players: 10,
  },
  {
    sport: 'Pádel',
    venue: 'Club La Ribera',
    date: 'Domingo 8 jun • 11:00',
    status: 'Pendiente',
    players: 4,
  },
  {
    sport: 'Baloncesto',
    venue: 'Polideportivo San José',
    date: 'Lunes 9 jun • 20:00',
    status: 'Confirmada',
    players: 10,
  },
]

const Booking = () => {
  return (
    <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">Reservas</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950">Tus próximos partidos</h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">Aquí verás tus reservas confirmadas y las que están pendientes de pago o validación.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {reservations.map((item) => (
              <ReservationCard key={`${item.sport}-${item.date}`} {...item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Booking