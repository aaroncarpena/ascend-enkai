import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthProvider from '../../../hooks/useAuthProvider.js'
import { get, getApiCollection } from '../../../lib/apiClient.js'
import { useSport } from '../../../hooks/useSport.js'
import ProfileForm from './ProfileForm.jsx'
import ProfileSummary from './ProfileSummary.jsx'

const ProfilePage = () => {
  const {
    token,
    user,
    profileLoading,
    uploadingAvatar,
    loadProfile,
    saveProfile,
    uploadAvatar,
  } = useAuthProvider()
  const { sports, fetchSports } = useSport()
  const [municipios, setMunicipios] = useState([])

  useEffect(() => {
    if (sports.length === 0) {
      fetchSports()
    }
  }, [fetchSports, sports.length])

  useEffect(() => {
    const loadMunicipios = async () => {
      try {
        const data = await get('municipios')
        setMunicipios(getApiCollection(data))
      } catch (err) {
        console.error('Error al cargar municipios:', err)
      }
    }

    loadMunicipios()
  }, [])

  useEffect(() => {
    if (token) {
      loadProfile()
    }
  }, [loadProfile, token])

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">Perfil</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">Inicia sesión para ver tu perfil</h1>
            <Link
              to="/login"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#AAED43] px-5 text-sm font-semibold text-[#1a2e00] no-underline transition hover:bg-[#91d236]"
            >
              Iniciar sesión
            </Link>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-4 text-left sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">Perfil</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950">Tu información personal</h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Gestiona tus datos básicos, ubicación deportiva y deporte favorito.
            </p>
          </div>

          {profileLoading ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
              <div className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
            </div>
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <ProfileSummary profile={user} />
              <ProfileForm
                profile={user}
                municipios={municipios}
                sports={sports}
                uploadingAvatar={uploadingAvatar}
                onAvatarUpload={uploadAvatar}
                onSubmit={saveProfile}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default ProfilePage
