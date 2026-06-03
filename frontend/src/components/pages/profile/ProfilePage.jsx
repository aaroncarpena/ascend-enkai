import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthProvider from '../../../hooks/useAuthProvider.js'
import { useApi } from '../../../hooks/useApi.js'
import { useSport } from '../../../hooks/useSport.js'
import ProfileForm from './ProfileForm.jsx'
import ProfileSummary from './ProfileSummary.jsx'

const emptyForm = {
  name: '',
  email: '',
  telefono: '',
  avatar: '',
  municipio_id: '',
  deporteFavorito: '',
}

const toForm = (profile) => ({
  name: profile?.name || '',
  email: profile?.email || '',
  telefono: profile?.telefono || '',
  avatar: profile?.perfil?.avatar || '',
  municipio_id: profile?.perfil?.municipio_id ? String(profile.perfil.municipio_id) : '',
  deporteFavorito: profile?.perfil?.deporteFavorito || '',
})

const ProfilePage = () => {
  const { token, user, updateCurrentUser } = useAuthProvider()
  const { get, put, postForm } = useApi()
  const { sports, fetchSports } = useSport()
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [municipios, setMunicipios] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (sports.length === 0) {
      fetchSports()
    }
  }, [fetchSports, sports.length])

  useEffect(() => {
    const loadMunicipios = async () => {
      try {
        const data = await get('municipios')
        setMunicipios(Array.isArray(data) ? data : data?.data || [])
      } catch (err) {
        console.error('Error al cargar municipios:', err)
      }
    }

    loadMunicipios()
  }, [get])

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        return
      }

      setLoading(true)
      setError('')

      try {
        const data = await get('perfil', token)
        setProfile(data)
        setForm(toForm(data))
      } catch (err) {
        console.error('Error al cargar perfil:', err)
        setError('No se pudo cargar tu perfil.')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [get, token])

  const favoriteSports = useMemo(() => {
    const names = [
      form.deporteFavorito,
      ...sports.map((sport) => sport.nombre),
    ].filter(Boolean)

    return [...new Set(names)]
  }, [form.deporteFavorito, sports])

  const updateField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await put(
        'perfil',
        {
          ...form,
          municipio_id: form.municipio_id ? Number(form.municipio_id) : null,
        },
        token,
      )

      setProfile(response)
      setForm(toForm(response))
      updateCurrentUser(response)
      setSuccess('Perfil actualizado.')
    } catch (err) {
      console.error('Error al guardar perfil:', err)
      setError('No se pudo guardar el perfil. Revisa los datos.')
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarUpload = async (file) => {
    if (!file) {
      return
    }

    const data = new FormData()
    data.append('avatar', file)
    setUploadingAvatar(true)
    setError('')
    setSuccess('')

    try {
      const response = await postForm('perfil/avatar', data, token)
      setProfile(response)
      setForm(toForm(response))
      updateCurrentUser(response)
      setSuccess('Avatar actualizado.')
    } catch (err) {
      console.error('Error al subir avatar:', err)
      setError('No se pudo subir la imagen. Usa JPG, PNG o WebP de menos de 4 MB.')
    } finally {
      setUploadingAvatar(false)
    }
  }

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

          {error && (
            <div className="mt-8 rounded-2xl bg-rose-50 p-4 text-left text-sm text-rose-800">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-8 rounded-2xl bg-[#E6F7D7] p-4 text-left text-sm text-[#1a2e00]">
              {success}
            </div>
          )}

          {loading ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
              <div className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
            </div>
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <ProfileSummary profile={profile} />
              <ProfileForm
                form={form}
                municipios={municipios}
                sports={favoriteSports}
                saving={saving}
                uploadingAvatar={uploadingAvatar}
                onChange={updateField}
                onAvatarUpload={handleAvatarUpload}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default ProfilePage
