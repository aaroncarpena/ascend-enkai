import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthProvider from '../../../hooks/useAuthProvider'
import { getInitial } from '../../../lib/utils.js'
import logo from '../../../assets/ascend-enkai-logo.png'

const Nav = () => {
  const { user, logout } = useAuthProvider()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const avatar = user?.perfil?.avatar
  const navLinkClass = [
    'shrink-0 rounded-lg px-2 py-1.5 text-xs font-medium text-[#1F1F1F] no-underline',
    'transition-colors duration-150 hover:bg-white hover:text-[#6ca719]',
    'sm:px-0 sm:py-0 sm:text-sm sm:font-normal sm:hover:bg-transparent sm:hover:text-[#AAED43]',
  ].join(' ')

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
      <div className="mx-auto flex min-h-14 max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-2 sm:h-14 sm:flex-nowrap sm:px-6 sm:py-0">
        <Link
          to="/"
          className="flex shrink-0 items-center no-underline"
          aria-label="Ascend-Enkai"
        >
          <img
            src={logo}
            alt="Ascend-Enkai"
            className="h-12 w-auto max-w-[92px] object-contain sm:h-[52px] sm:max-w-[104px]"
          />
        </Link>

        <div className="order-3 flex w-full items-center justify-center gap-2 overflow-x-auto whitespace-nowrap sm:order-none sm:w-auto sm:justify-start sm:gap-8 sm:overflow-visible">
          <Link className={navLinkClass} to="/deportes">
            Deportes
          </Link>
          <Link className={navLinkClass} to="/instalaciones">
            Instalaciones
          </Link>

          {user && (
            <Link className={navLinkClass} to="/mis-partidos">
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
            className="shrink-0 rounded-lg bg-[#AAED43] px-3 py-1.5 text-xs font-medium text-[#1a2e00] no-underline transition-colors duration-150 hover:bg-[#1F1F1F] hover:text-[#AAED43] sm:px-4 sm:text-sm"
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
