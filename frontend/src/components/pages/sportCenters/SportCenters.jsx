import React, { useEffect, useRef } from 'react'
import { useSportCenter } from '../../../hooks/useSportCenter'
import SportCenterCard from './SportCenterCard.jsx'

const SportCenters = () => {
  const { centers, loading, error, fetchSportCenters } = useSportCenter()
  const requestedCenters = useRef(false)
  const refreshedMissingMunicipio = useRef(false)

  useEffect(() => {
    if (loading) {
      return
    }

    const hasCentersWithoutMunicipio = centers.some((center) => !center.municipio?.nombre)

    if (centers.length === 0 && !requestedCenters.current) {
      requestedCenters.current = true
      fetchSportCenters()
      return
    }

    if (hasCentersWithoutMunicipio && !refreshedMissingMunicipio.current) {
      refreshedMissingMunicipio.current = true
      fetchSportCenters()
    }
  }, [centers, loading, fetchSportCenters])

  return (
    <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">Instalaciones</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950">Canchas y centros deportivos</h1>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Explora las instalaciones disponibles cerca de ti, revisa horarios y precios, y elige el lugar ideal para tu próximo partido.
            </p>
          </div>

          {error && (
            <div className="mt-8 rounded-3xl bg-rose-50 p-5 text-sm text-rose-800">
              {error}
            </div>
          )}

          <div className="mt-10">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="h-60 rounded-[1.5rem] bg-slate-200 animate-pulse" />
                ))}
              </div>
            ) : centers.length === 0 ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-sm text-slate-600">Aún no hay instalaciones disponibles.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {centers.map((center) => (
                  <SportCenterCard key={center.id} center={center} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default SportCenters
