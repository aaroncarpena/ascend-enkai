import React from 'react'
import { Link } from 'react-router-dom'

const QuickStartBanner = () => {
  return (
    <section className="mt-14 rounded-[1.75rem] bg-white p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.12)] sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">¿Aún no tienes cuenta?</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Regístrate y organiza tu primer partido.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="inline-flex items-center justify-center rounded-full bg-[#AAED43] px-6 py-3 text-sm font-semibold text-[#1a2e00] transition hover:bg-[#91d236]" to="/registro">
            Crear cuenta
          </Link>
          <Link className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50" to="/login">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </section>
  )
}

export default QuickStartBanner
