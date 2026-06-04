import React from 'react'
import StepCard from './StepCard.jsx'

const steps = [
  {
    title: 'Busca',
    description: 'Selecciona deporte, ubicación y disponibilidad al instante.',
  },
  {
    title: 'Únete',
    description: 'Encuentra un partido disponible o crea uno nuevo.',
  },
  {
    title: 'Juega',
    description: 'Llega a la cancha y disfruta del partido con todo listo.',
  },
]

const HowItWorks = () => {
  return (
    <section className="mt-14 rounded-[2rem] border border-slate-200 bg-white px-8 py-12 shadow-sm sm:px-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">Cómo funciona</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Tres pasos para jugar más y organizar mejor</h2>
          <p className="max-w-2xl text-base leading-7 text-slate-600">Desde explorar instalaciones hasta encontrar un partido y reunirte con tu equipo, esta página inicial te ayuda a comenzar con confianza y sin perder tiempo.</p>
        </div>

        <div className="grid gap-4">
          {steps.map((step, index) => (
            <StepCard key={step.title} index={index + 1} title={step.title} description={step.description} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
