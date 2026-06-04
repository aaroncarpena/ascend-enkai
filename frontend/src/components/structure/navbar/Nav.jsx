import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthProvider from '../../../hooks/useAuthProvider'
import { getInitial } from '../../../lib/utils.js'

const Nav = () => {
  const { user, logout } = useAuthProvider()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const avatar = user?.perfil?.avatar

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', closeMenu)
    return () => document.removeEventListener('mousedown', closeMenu)
  }, [])

  const handleLogout = async () => {
    setMenuOpen(false)
    await logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#E5E7EB] bg-[#F5F6F8]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="font-semibold tracking-tight text-[#1F1F1F] no-underline transition-colors duration-150 hover:text-[#AAED43]"
        >
          Pachangas
        </Link>

        <div className="flex items-center gap-8">
          <Link className="text-sm text-[#1F1F1F] no-underline transition-colors duration-150 hover:text-[#AAED43]" to="/deportes">
            Deportes
          </Link>
          <Link className="text-sm text-[#1F1F1F] no-underline transition-colors duration-150 hover:text-[#AAED43]" to="/instalaciones">
            Instalaciones
          </Link>

          {user && (
            <Link className="text-sm text-[#1F1F1F] no-underline transition-colors duration-150 hover:text-[#AAED43]" to="/mis-partidos">
              Mis partidos
            </Link>
          )}
        </div>

        {user ? (
          <div ref={menuRef} className="relative">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#AAED43] bg-[#AAED43] text-sm font-semibold text-[#1a2e00] transition-colors duration-150 hover:border-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-[#AAED43]"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="Abrir menú de perfil"
              aria-expanded={menuOpen}
              title={user.name || 'Perfil'}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={user.name || 'Perfil'}
                  className="h-full w-full object-cover"
                />
              ) : (
                getInitial(user.name)
              )}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 z-50 min-w-44 rounded-xl border border-slate-200 bg-white p-2 text-left shadow-lg">
                {user.rol === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-10 items-center rounded-lg px-3 text-sm font-medium text-slate-700 no-underline transition hover:bg-slate-50"
                  >
                    Panel de control
                  </Link>
                )}
                <Link
                  to="/perfil"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-10 items-center rounded-lg px-3 text-sm font-medium text-slate-700 no-underline transition hover:bg-slate-50"
                >
                  Ver perfil
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex min-h-10 w-full items-center rounded-lg px-3 text-left text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            className="rounded-lg bg-[#AAED43] px-4 py-1.5 text-sm font-medium text-[#1a2e00] no-underline transition-colors duration-150 hover:bg-[#1F1F1F] hover:text-[#AAED43]"
            to="/login"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Nav
