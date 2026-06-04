import React from 'react'
import { useForm } from 'react-hook-form'

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
  showCenterSelect = true,
  showSportSelect = false,
  onCancel,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: initialForm })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {showSportSelect && (
          <label className="grid gap-2 text-sm font-medium text-slate-700 xl:col-span-2">
            Deporte
            <select
              required
              {...register('deporte_id')}
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

        {showCenterSelect && (
          <label className="grid gap-2 text-sm font-medium text-slate-700 xl:col-span-2">
            Instalación
            <select
              required
              {...register('instalacion_id')}
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
            {...register('fecha')}
            className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Nivel
          <select
            {...register('nivel')}
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
            {...register('hora_inicio')}
            className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Fin
          <input
            required
            type="time"
            {...register('hora_fin')}
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
            {...register('max_jugadores')}
            className="min-h-11 rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2 xl:col-span-4">
          Descripción
          <textarea
            rows="3"
            {...register('descripcion')}
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
          disabled={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <i className="pi pi-check text-sm" aria-hidden="true" />
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}

export default CreateMatchForm
