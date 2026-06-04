import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const emptyForm = {
  nombre: '',
  direccion: '',
  municipio_id: '',
  precio: '0',
  horario_apertura: '',
  horario_clausura: '',
}

const toForm = (center) => {
  if (!center) {
    return emptyForm
  }

  return {
    nombre: center.nombre || '',
    direccion: center.direccion || '',
    municipio_id: center.municipio_id ? String(center.municipio_id) : '',
    precio: center.precio ?? '0',
    horario_apertura: center.horario_apertura?.slice(0, 5) || '',
    horario_clausura: center.horario_clausura?.slice(0, 5) || '',
  }
}

const AdminSportCenterForm = ({ center, municipios, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues: toForm(center) })

  useEffect(() => {
    reset(toForm(center))
  }, [center, reset])

  const submit = (data) => {
    return onSubmit({
      ...data,
      municipio_id: Number(data.municipio_id),
      precio: Number(data.precio),
    })
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
      <h2 className="text-xl font-semibold text-slate-950">
        {center ? 'Editar instalación' : 'Nueva instalación'}
      </h2>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Nombre
          <input
            {...register('nombre')}
            required
            className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Municipio
          <select
            {...register('municipio_id')}
            required
            className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#AAED43]"
          >
            <option value="">Selecciona un municipio</option>
            {municipios.map((municipio) => (
              <option key={municipio.id} value={municipio.id}>
                {municipio.nombre}
                {municipio.provincia?.nombre ? `, ${municipio.provincia.nombre}` : ''}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700 md:col-span-2">
          Dirección
          <input
            {...register('direccion')}
            required
            className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#AAED43]"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Precio
          <input
            {...register('precio')}
            type="number"
            min="0"
            step="0.01"
            required
            className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#AAED43]"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Apertura
            <input
              {...register('horario_apertura')}
              type="time"
              required
              className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#AAED43]"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Cierre
            <input
              {...register('horario_clausura')}
              type="time"
              required
              className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#AAED43]"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#AAED43] px-5 text-sm font-semibold text-[#1a2e00] transition hover:bg-[#91d236] disabled:opacity-60"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar instalación'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default AdminSportCenterForm
