import React from 'react'
import { useForm } from 'react-hook-form'
import useAuthProvider from '../../../hooks/useAuthProvider.js'

const SignUp = () => {
  const { defaultDataSesion } = useAuthProvider()
  const { register, handleSubmit } = useForm({ defaultValues: defaultDataSesion })
  const onSubmit = (data) => console.log(data)

  return (
    <div className='min-h-screen bg-[#F5F6F8] flex items-center justify-center px-4'>
      <div className='bg-white border border-[#E5E7EB] rounded-xl p-8 w-full max-w-sm'>

        <h2 className='text-[#1F1F1F] text-xl font-semibold tracking-tight mb-6'>Crear cuenta</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='name' className='text-[#1F1F1F] text-sm font-medium'>Usuario</label>
            <input
              {...register('name')}
              type='text'
              id='name'
              placeholder='Introduce tu usuario'
              className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='email' className='text-[#1F1F1F] text-sm font-medium'>Email</label>
            <input
              {...register('email')}
              type='email'
              id='email'
              placeholder='Introduce tu email'
              className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='telefono' className='text-[#1F1F1F] text-sm font-medium'>Teléfono</label>
            <input
              {...register('telefono')}
              type='tel'
              id='telefono'
              placeholder='Introduce tu teléfono'
              className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='password' className='text-[#1F1F1F] text-sm font-medium'>Contraseña</label>
            <input
              {...register('password')}
              type='password'
              id='password'
              placeholder='Introduce tu contraseña'
              className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='password_verified' className='text-[#1F1F1F] text-sm font-medium'>Confirmar contraseña</label>
            <input
              {...register('password_verified')}
              type='password'
              id='password_verified'
              placeholder='Repite tu contraseña'
              className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150'
            />
          </div>

          <button
            type='submit'
            className='mt-2 bg-[#AAED43] text-[#1a2e00] text-sm font-medium py-2 rounded-lg hover:bg-[#1F1F1F] hover:text-[#AAED43] transition-colors duration-150'
          >
            Registrarse
          </button>

        </form>
      </div>
    </div>
  )
}

export default SignUp