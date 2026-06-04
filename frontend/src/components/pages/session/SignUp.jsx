import React from 'react'
import { useForm } from 'react-hook-form'
import useAuthProvider from '../../../hooks/useAuthProvider.js'

const SignUp = () => {
  const { defaultDataSesion, register: registerUser, error } = useAuthProvider()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues: defaultDataSesion })

  const onSubmit = async (data) => {
    try {
      await registerUser(data)
      reset(defaultDataSesion)
    } catch (e) {
      console.error('Registro fallido:', e)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl rounded-[2rem] border border-[#E5E7EB] bg-white p-8 shadow-xl sm:p-10">
        <h2 className="mb-6 text-3xl font-semibold text-[#1F1F1F]">Crear cuenta</h2>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-[#1F1F1F]">
              Usuario
              <input
                {...register('name')}
                type="text"
                required
                placeholder="Introduce tu usuario."
                className="min-h-11 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-4 text-sm text-[#1F1F1F] outline-none transition-colors duration-150 focus:border-[#AAED43]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#1F1F1F]">
              Correo electrónico
              <input
                {...register('email')}
                type="email"
                required
                placeholder="Introduce tu correo electrónico."
                className="min-h-11 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-4 text-sm text-[#1F1F1F] outline-none transition-colors duration-150 focus:border-[#AAED43]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#1F1F1F]">
              Teléfono
              <input
                {...register('telefono')}
                type="tel"
                required
                placeholder="Introduce tu teléfono."
                className="min-h-11 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-4 text-sm text-[#1F1F1F] outline-none transition-colors duration-150 focus:border-[#AAED43]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#1F1F1F]">
              Contraseña
              <input
                {...register('password')}
                type="password"
                required
                minLength={6}
                placeholder="Introduce tu contraseña."
                className="min-h-11 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-4 text-sm text-[#1F1F1F] outline-none transition-colors duration-150 focus:border-[#AAED43]"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-[#1F1F1F] md:col-span-2">
              Confirmar contraseña
              <input
                {...register('password_verified')}
                type="password"
                required
                minLength={6}
                placeholder="Repite tu contraseña."
                className="min-h-11 rounded-xl border border-[#E5E7EB] bg-[#F5F6F8] px-4 text-sm text-[#1F1F1F] outline-none transition-colors duration-150 focus:border-[#AAED43]"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-[#AAED43] px-4 py-3 text-sm font-semibold text-[#1a2e00] transition-colors duration-150 hover:bg-[#1F1F1F] hover:text-[#AAED43] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
