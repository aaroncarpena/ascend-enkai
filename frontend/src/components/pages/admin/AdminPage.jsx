import React from 'react'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Usuarios',
    description: 'Consulta todas las cuentas registradas y elimina las que ya no deban tener acceso.',
    icon: 'pi pi-users',
    to: '/admin/usuarios',
  },
  {
    title: 'Instalaciones',
    description: 'Crea instalaciones y actualiza sus datos, horarios o precios.',
    icon: 'pi pi-building',
    to: '/admin/instalaciones',
  },
]

const AdminPage = () => {
  return (
    <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">
            Administración
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950">Panel de control</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Gestiona los usuarios y las instalaciones disponibles en la plataforma.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <Link
                key={section.to}
                to={section.to}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left text-slate-900 no-underline transition hover:-translate-y-1 hover:border-[#AAED43] hover:bg-white hover:shadow-md"
              >
                <i className={`${section.icon} text-2xl text-[#6ca719]`} aria-hidden="true" />
                <h2 className="mt-5 text-xl font-semibold">{section.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{section.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminPage
