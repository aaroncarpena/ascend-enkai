import React from 'react'
import { Link } from 'react-router-dom'

const groups = [
  {
    title: 'Explorar',
    links: [
      { label: 'Instalaciones', to: '/instalaciones' },
      { label: 'Deportes', to: '/deportes' },
      { label: 'Reservas', to: '/reservas' },
    ],
  },
  {
    title: 'Cuenta',
    links: [
      { label: 'Iniciar sesión', to: '/login' },
      { label: 'Registrarse', to: '/registro' },
    ],
  },
]

const FooterLinks = () => {
  return (
    <div className='flex gap-12'>
      {groups.map(({ title, links }) => (
        <div key={title} className='flex flex-col gap-3'>
          <span className='text-[#AAED43] text-sm font-semibold'>{title}</span>
          <ul className='flex flex-col gap-2 list-none p-0 m-0'>
            {links.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className='text-[#6B7280] text-sm no-underline hover:text-[#AAED43] transition-colors duration-150'
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default FooterLinks