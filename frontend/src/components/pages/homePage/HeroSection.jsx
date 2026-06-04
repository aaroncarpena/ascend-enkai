import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr] p-10 sm:p-14">
        <div className="space-y-8">
          <div className="inline-flex rounded-full bg-[#E8F7C9] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#1F1F1F]">
            Organiza tu próxima pachanga
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
              Encuentra deportes, instalaciones y partidos en un instante.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              Descubre instalaciones cercanas, elige el deporte que te gusta y encuentra gente con quien jugar. Todo desde una misma plataforma pensada para grupos deportivos y campeonatos espontáneos.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/instalaciones"
              className="inline-flex items-center justify-center rounded-full bg-[#AAED43] px-6 py-3 text-sm font-semibold text-[#1a2e00] shadow-sm transition hover:bg-[#91d236]"
            >
              Ver instalaciones
            </Link>
            <Link
              to="/deportes"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Explorar deportes
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <article className="rounded-[1.5rem] border border-slate-200 bg-[#F7FFF8] p-6 shadow-inner shadow-slate-100">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/80">Funciona rápido</p>
            <h2 className="mt-4 text-2xl font-bold text-slate-950">Búsqueda inteligente</h2>
            <p className="mt-3 text-slate-600">Filtra por deporte, ubicación y horario para encontrar la cancha perfecta sin desplazamientos largos.</p>
          </article>
          <article className="rounded-[1.5rem] border border-slate-200 bg-[#F7FFF8] p-6 shadow-inner shadow-slate-100">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/80">Todo en un lugar</p>
            <h2 className="mt-4 text-2xl font-bold text-slate-950">Partidos abiertos</h2>
            <p className="mt-3 text-slate-600">Crea encuentros o únete a partidos disponibles según tu deporte y nivel.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
