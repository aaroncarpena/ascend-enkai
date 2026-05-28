import React from 'react'
import { Link } from 'react-router-dom'

const LoginRegister = () => {
  return (
    <p className='text-[#6B7280] text-sm text-center mt-5'>
      No tienes cuenta,{' '}
      <Link to='/registro' className='text-[#1F1F1F] font-medium no-underline hover:text-[#AAED43] transition-colors duration-150'>
        Regístrate aquí
      </Link>
    </p>
  )
}

export default LoginRegister