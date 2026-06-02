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
    <div className='min-h-screen bg-[#F5F6F8] flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-lg rounded-[2rem] border border-[#E5E7EB] bg-white p-10 shadow-xl'>
        <h2 className='mb-6 text-3xl font-semibold text-[#1F1F1F]'>Crear cuenta</h2>

        {error && (
          <div className='mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div>
            <label htmlFor='name' className='mb-2 block text-sm font-medium text-[#1F1F1F]'>Usuario</label>
            <input {...register('name')} type='text' id='name' placeholder='Introduce tu usuario' className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150' />
          </div>

          <div>
            <label htmlFor='email' className='mb-2 block text-sm font-medium text-[#1F1F1F]'>Email</label>
            <input {...register('email')} type='email' id='email' placeholder='Introduce tu email' className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150' />
          </div>

          <div>
            <label htmlFor='telefono' className='mb-2 block text-sm font-medium text-[#1F1F1F]'>Teléfono</label>
            <input {...register('telefono')} type='tel' id='telefono' placeholder='Introduce tu teléfono' className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150' />
          </div>

          <div>
            <label htmlFor='password' className='mb-2 block text-sm font-medium text-[#1F1F1F]'>Contraseña</label>
            <input {...register('password')} type='password' id='password' placeholder='Introduce tu contraseña' className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150' />
          </div>

          <div>
            <label htmlFor='password_verified' className='mb-2 block text-sm font-medium text-[#1F1F1F]'>Confirmar contraseña</label>
            <input {...register('password_verified')} type='password' id='password_verified' placeholder='Repite tu contraseña' className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150' />
          </div>

          <button type='submit' disabled={isSubmitting} className='w-full rounded-2xl bg-[#AAED43] px-4 py-3 text-sm font-semibold text-[#1a2e00] transition-colors duration-150 hover:bg-[#1F1F1F] hover:text-[#AAED43] disabled:opacity-60 disabled:cursor-not-allowed'>
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp