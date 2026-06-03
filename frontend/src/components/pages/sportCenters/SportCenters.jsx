import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSportCenter } from '../../../hooks/useSportCenter'
import SportCenterCard from './SportCenterCard.jsx'

const defaultFilters = {
  search: '',
  municipio: '',
  provincia: '',
}

const SportCenters = () => {
  const { centers, loading, error, fetchSportCenters } = useSportCenter()
  const [filters, setFilters] = useState(defaultFilters)
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

  const municipios = useMemo(() => {
    const names = centers.map((center) => center.municipio?.nombre).filter(Boolean)
    return [...new Set(names)].sort()
  }, [centers])

  const provincias = useMemo(() => {
    const names = centers.map((center) => center.municipio?.provincia?.nombre).filter(Boolean)
    return [...new Set(names)].sort()
  }, [centers])

  const filteredCenters = useMemo(() => {
    const search = filters.search.trim().toLowerCase()

    return centers.filter((center) => {
      const matchesSearch = !search
        || center.nombre?.toLowerCase().includes(search)
        || center.direccion?.toLowerCase().includes(search)
      const matchesMunicipio = !filters.municipio || center.municipio?.nombre === filters.municipio
      const matchesProvincia = !filters.provincia || center.municipio?.provincia?.nombre === filters.provincia

      return matchesSearch && matchesMunicipio && matchesProvincia
    })
  }, [centers, filters])

  const updateFilter = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }))
  }

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
              Explora instalaciones disponibles cerca de ti y encuentra el lugar ideal para tu próximo partido.
            </p>
          </div>

          {error && (
            <div className="mt-8 rounded-3xl bg-rose-50 p-5 text-sm text-rose-800">
              {error}
            </div>
          )}

          <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Buscar
              <input
                type="search"
                value={filters.search}
                onChange={(event) => updateFilter('search', event.target.value)}
                placeholder="Nombre o dirección"
                className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Municipio
              <select
                value={filters.municipio}
                onChange={(event) => updateFilter('municipio', event.target.value)}
                className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
              >
                <option value="">Todos</option>
                {municipios.map((municipio) => (
                  <option key={municipio} value={municipio}>
                    {municipio}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Provincia
              <select
                value={filters.provincia}
                onChange={(event) => updateFilter('provincia', event.target.value)}
                className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
              >
                <option value="">Todas</option>
                {provincias.map((provincia) => (
                  <option key={provincia} value={provincia}>
                    {provincia}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => setFilters(defaultFilters)}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Limpiar
            </button>
          </div>

          <div className="mt-10">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="h-60 rounded-[1.5rem] bg-slate-200 animate-pulse" />
                ))}
              </div>
            ) : filteredCenters.length === 0 ? (
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-sm text-slate-600">No hay instalaciones con esos filtros.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredCenters.map((center) => (
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
