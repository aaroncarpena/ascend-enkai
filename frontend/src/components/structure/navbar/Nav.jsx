import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { authProvider } from '../../../providers/AuthProvider'

const Nav = () => {
  const { user } = useContext(authProvider)

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-[#F5F6F8] border-b border-[#E5E7EB]'>
      <div className='max-w-6xl mx-auto px-6 h-14 flex items-center justify-between'>
        
        {/* Logo */}
        <Link to='/' className='text-[#1F1F1F] font-semibold tracking-tight no-underline hover:text-[#AAED43] transition-colors duration-150'>
          Pachangas
        </Link>

        {/* Links - Cambian según autenticación */}
        <div className='flex items-center gap-8'>
          <Link className='text-[#1F1F1F] text-sm no-underline hover:text-[#AAED43] transition-colors duration-150' to='/deportes'>
            Deportes
          </Link>
          <Link className='text-[#1F1F1F] text-sm no-underline hover:text-[#AAED43] transition-colors duration-150' to='/instalaciones'>
            Instalaciones
          </Link>
          
          {/* Solo visible si está logueado */}
          {user && (
            <Link className='text-[#1F1F1F] text-sm no-underline hover:text-[#AAED43] transition-colors duration-150' to='/reservas'>
              Mis reservas
            </Link>
          )}
        </div>

        {/* Botón derecha - Cambia según autenticación */}
        {user ? (
          <Link className='text-sm no-underline bg-[#AAED43] text-[#1a2e00] font-medium px-4 py-1.5 rounded-lg hover:bg-[#1F1F1F] hover:text-[#AAED43] transition-colors duration-150' to='/perfil'>
            {user.name || 'Perfil'}
          </Link>
        ) : (
          <Link className='text-sm no-underline bg-[#AAED43] text-[#1a2e00] font-medium px-4 py-1.5 rounded-lg hover:bg-[#1F1F1F] hover:text-[#AAED43] transition-colors duration-150' to='/login'>
            Iniciar sesión
          </Link>
        )}

      </div>
    </nav>
  )
}

export default Nav
