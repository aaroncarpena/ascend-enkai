import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAuthProvider from '../../../hooks/useAuthProvider.js'
import LoginRegister from './LoginRegister'

const LoginForm = () => {
  const { login, error } = useAuthProvider()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { login: '', password: '' } })

  const onSubmit = async (data) => {
    try {
      await login(data)
      navigate('/')
    } catch (e) {
      console.error('Login fallido:', e)
    }
  }

  return (
    <div className='min-h-screen bg-[#F5F6F8] flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-lg rounded-[2rem] border border-[#E5E7EB] bg-white p-10 shadow-xl'>
        <h2 className='mb-6 text-3xl font-semibold text-[#1F1F1F]'>Iniciar sesión</h2>

        {error && (
          <div className='mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div>
            <label htmlFor='login' className='mb-2 block text-sm font-medium text-[#1F1F1F]'>Usuario o correo electrónico</label>
            <input {...register('login')} type='text' id='login' required maxLength={255} autoComplete='username' placeholder='Introduce tu usuario o correo electrónico.' className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150' />
          </div>

          <div>
            <label htmlFor='password' className='mb-2 block text-sm font-medium text-[#1F1F1F]'>Contraseña</label>
            <input {...register('password')} type='password' id='password' required maxLength={255} autoComplete='current-password' placeholder='Introduce tu contraseña.' className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150' />
          </div>

          <button type='submit' disabled={isSubmitting} className='w-full rounded-2xl bg-[#AAED43] px-4 py-3 text-sm font-semibold text-[#1a2e00] transition-colors duration-150 hover:bg-[#1F1F1F] hover:text-[#AAED43] disabled:opacity-60 disabled:cursor-not-allowed'>
            {isSubmitting ? 'Iniciando...' : 'Entrar'}
          </button>
        </form>

        <LoginRegister />
      </div>
    </div>
  )
}

export default LoginForm
