import React from 'react'

const ModalityBadge = ({ modality }) => {
  const colorMap = {
    'Individual': 'bg-blue-100 text-blue-800',
    'Doble': 'bg-purple-100 text-purple-800',
    'Equipos': 'bg-green-100 text-green-800',
  }

  const color = colorMap[modality.nombre] || 'bg-gray-100 text-gray-800'

  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${color}`}>
      {modality.nombre}
    </span>
  )
}

export default ModalityBadge
