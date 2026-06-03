import React, { useState } from 'react'

const initialForm = {
  deporte_id: '',
  instalacion_id: '',
  fecha: '',
  hora_inicio: '',
  hora_fin: '',
  max_jugadores: 4,
  nivel: 'Intermedio',
  descripcion: '',
}

const CreateMatchForm = ({
  centers,
  sports = [],
  fixedCenterId = '',
  showSportSelect = false,
  onCancel,
  onSubmit,
}) => {
  const [form, setForm] = useState({
    ...initialForm,
    instalacion_id: fixedCenterId ? String(fixedCenterId) : '',
  })
  const [submitting, setSubmitting] = useState(false)

  const updateField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)

    try {
      await onSubmit(form)
      setForm(initialForm)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {showSportSelect && (
          <label className="grid gap-2 text-sm font-medium text-slate-700 xl:col-span-2">
            Deporte
            <select
              required
              value={form.deporte_id}
              onChange={(event) => updateField('deporte_id', event.target.value)}
              className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
            >
              <option value="">Selecciona un deporte</option>
              {sports.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.nombre}
                </option>
              ))}
            </select>
          </label>
        )}

        {!fixedCenterId && (
          <label className="grid gap-2 text-sm font-medium text-slate-700 xl:col-span-2">
            Instalación
            <select
              required
              value={form.instalacion_id}
              onChange={(event) => updateField('instalacion_id', event.target.value)}
              className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
            >
              <option value="">Selecciona una instalación</option>
              {centers.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.nombre}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Fecha
          <input
            required
            type="date"
            value={form.fecha}
            onChange={(event) => updateField('fecha', event.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Nivel
          <select
            value={form.nivel}
            onChange={(event) => updateField('nivel', event.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          >
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Inicio
          <input
            required
            type="time"
            value={form.hora_inicio}
            onChange={(event) => updateField('hora_inicio', event.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Fin
          <input
            required
            type="time"
            value={form.hora_fin}
            onChange={(event) => updateField('hora_fin', event.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Jugadores
          <input
            required
            type="number"
            min="2"
            max="50"
            value={form.max_jugadores}
            onChange={(event) => updateField('max_jugadores', event.target.value)}
            className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2 xl:col-span-4">
          Descripción
          <textarea
            rows="3"
            value={form.descripcion}
            onChange={(event) => updateField('descripcion', event.target.value)}
            className="resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <i className="pi pi-check text-sm" aria-hidden="true" />
          Guardar
        </button>
      </div>
    </form>
  )
}

export default CreateMatchForm
