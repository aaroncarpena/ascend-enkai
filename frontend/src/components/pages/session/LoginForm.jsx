import React from 'react'
import LoginRegister from './LoginRegister'

const LoginForm = () => {
  return (
    <div className='min-h-screen bg-[#F5F6F8] flex items-center justify-center px-4'>
      <div className='bg-white border border-[#E5E7EB] rounded-xl p-8 w-full max-w-sm'>

        <h2 className='text-[#1F1F1F] text-xl font-semibold tracking-tight mb-6'>Iniciar sesión</h2>

        <form className='flex flex-col gap-4'>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='identifier' className='text-[#1F1F1F] text-sm font-medium'>
              Usuario o email
            </label>
            <input
              type='text'
              name='identifier'
              id='identifier'
              placeholder='Introduce tu usuario o email'
              className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='password' className='text-[#1F1F1F] text-sm font-medium'>
              Contraseña
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Introduce tu contraseña'
              className='bg-[#F5F6F8] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#1F1F1F] placeholder-[#6B7280] outline-none focus:border-[#AAED43] transition-colors duration-150'
            />
          </div>

          <button
            type='submit'
            className='mt-2 bg-[#AAED43] text-[#1a2e00] text-sm font-medium py-2 rounded-lg hover:bg-[#1F1F1F] hover:text-[#AAED43] transition-colors duration-150'
          >
            Entrar
          </button>

        </form>

        <LoginRegister />

      </div>
    </div>
  )
}

export default LoginForm