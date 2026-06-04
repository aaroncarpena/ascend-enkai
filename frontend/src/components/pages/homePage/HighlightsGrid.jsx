import React from 'react'
import FeatureCard from './FeatureCard.jsx'

const highlights = [
  {
    title: 'Encuentra sedes',
    category: 'Instalaciones',
    description: 'Accede a canchas, polideportivos y espacios comunitarios con horarios disponibles y opiniones reales.',
  },
  {
    title: 'Amplia oferta',
    category: 'Deportes',
    description: 'Baloncesto, fútbol, pádel y más: encuentra el espacio perfecto para cada disciplina.',
  },
  {
    title: 'Sin complicaciones',
    category: 'Partidos',
    description: 'Crea partidos, encuentra jugadores y organiza encuentros de forma sencilla.',
  },
]

const HighlightsGrid = () => {
  return (
    <section className="mt-14 grid gap-6 lg:grid-cols-3">
      {highlights.map((item) => (
        <FeatureCard key={item.title} {...item} />
      ))}
    </section>
  )
}

export default HighlightsGrid
