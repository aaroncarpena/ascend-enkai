import React, { useEffect, useMemo, useState } from 'react'
import { useSport } from '../../../hooks/useSport'
import SportsList from './SportsList.jsx'

const SportsPage = () => {
  const { sports, loading, error, fetchSports } = useSport()
  const [modalityFilter, setModalityFilter] = useState('')

  useEffect(() => {
    if (sports.length === 0) {
      fetchSports()
    }
  }, [fetchSports, sports.length])

  const modalities = useMemo(() => {
    const names = sports.flatMap((sport) => (
      sport.modalidades?.map((modality) => modality.nombre).filter(Boolean) || []
    ))

    return [...new Set(names)]
  }, [sports])

  const filteredSports = useMemo(() => {
    if (!modalityFilter) {
      return sports
    }

    return sports.filter((sport) => (
      sport.modalidades?.some((modality) => modality.nombre === modalityFilter)
    ))
  }, [modalityFilter, sports])

  return (
    <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
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

          <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Modalidad
              <select
                value={modalityFilter}
                onChange={(event) => setModalityFilter(event.target.value)}
                className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
              >
                <option value="">Todas</option>
                {modalities.map((modality) => (
                  <option key={modality} value={modality}>
                    {modality}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => setModalityFilter('')}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Limpiar
            </button>
          </div>

          <div className="mt-10">
            <SportsList sports={filteredSports} loading={loading} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default SportsPage
