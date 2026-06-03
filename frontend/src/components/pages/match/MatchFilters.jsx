import React from 'react'

const getGridClass = (showCenterFilter, showSportFilter) => {
  if (showCenterFilter && showSportFilter) {
    return 'md:grid-cols-[repeat(4,minmax(0,1fr))_auto]'
  }

  if (showCenterFilter || showSportFilter) {
    return 'md:grid-cols-[repeat(3,minmax(0,1fr))_auto]'
  }

  return 'md:grid-cols-[repeat(2,minmax(0,1fr))_auto]'
}

const MatchFilters = ({
  filters,
  levels,
  centers,
  sports = [],
  showCenterFilter = true,
  showSportFilter = false,
  onChange,
  onReset,
}) => {
  const setFilter = (key, value) => {
    onChange({
      ...filters,
      [key]: value,
    })
  }

  return (
    <div className={`grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left md:items-end ${getGridClass(showCenterFilter, showSportFilter)}`}>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Nivel
        <select
          value={filters.nivel}
          onChange={(event) => setFilter('nivel', event.target.value)}
          className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
        >
          <option value="">Todos</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Fecha
        <input
          type="date"
          value={filters.fecha}
          onChange={(event) => setFilter('fecha', event.target.value)}
          className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
        />
      </label>

      {showSportFilter && (
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Deporte
          <select
            value={filters.deporte_id}
            onChange={(event) => setFilter('deporte_id', event.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          >
            <option value="">Todos</option>
            {sports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.nombre}
              </option>
            ))}
          </select>
        </label>
      )}

      {showCenterFilter && (
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Instalación
          <select
            value={filters.instalacion_id}
            onChange={(event) => setFilter('instalacion_id', event.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          >
            <option value="">Todas</option>
            {centers.map((center) => (
              <option key={center.id} value={center.id}>
                {center.nombre}
              </option>
            ))}
          </select>
        </label>
      )}

      <button
        type="button"
        onClick={onReset}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
      >
        <i className="pi pi-filter-slash text-sm" aria-hidden="true" />
        Limpiar
      </button>
    </div>
  )
}

export default MatchFilters
