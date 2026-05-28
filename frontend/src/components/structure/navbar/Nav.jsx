import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-[#F5F6F8] border-b border-[#E5E7EB]'>
      <div className='max-w-5xl mx-auto px-6 h-14 flex items-center justify-between'>

        <span className='text-[#1F1F1F] font-semibold tracking-tight'>Pachangas</span>

        <div className='flex items-center gap-8'>
          <Link className='text-[#1F1F1F] text-sm no-underline hover:text-[#AAED43] transition-colors duration-150' to='/instalaciones'>Instalaciones</Link>
          <Link className='text-[#1F1F1F] text-sm no-underline hover:text-[#AAED43] transition-colors duration-150' to='/deportes'>Deportes</Link>
          <Link className='text-[#1F1F1F] text-sm no-underline hover:text-[#AAED43] transition-colors duration-150' to='/reservas'>Reservas</Link>
        </div>

        <Link className='text-sm no-underline bg-[#AAED43] text-[#1a2e00] font-medium px-4 py-1.5 rounded-lg hover:bg-[#1F1F1F] hover:text-[#AAED43] transition-colors duration-150' to='/login'>Iniciar sesión</Link>

      </div>
    </nav>
  )
}

export default Nav