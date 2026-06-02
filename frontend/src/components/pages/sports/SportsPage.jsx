import React, { useEffect } from 'react'
import { useSport } from '../../../hooks/useSport'
import SportsList from '../../../components/sports/SportsList.jsx'

const SportsPage = () => {
  const { sports, loading, error, fetchSports } = useSport()

  useEffect(() => {
    if (sports.length === 0) {
      fetchSports()
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">Deportes</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950">Elige tu deporte favorito</h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Descubre todos los deportes disponibles en nuestras instalaciones. Filtra por modalidad y encuentra el que se adapte a ti.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="mt-10">
            <SportsList sports={sports} loading={loading} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default SportsPage
