import React from 'react'

const FooterBottom = () => {


  return (
    <div className='border-t border-[#E5E7EB] pt-5 flex items-center justify-between gap-4 flex-wrap'>
      <span className='text-[#6B7280] text-xs'>
        © 2026 Pachangas. Todos los derechos reservados.
      </span>
      <div className='flex gap-4'>
        <span className='text-[#6B7280] text-xs hover:text-[#AAED43] cursor-pointer transition-colors duration-150'>Privacidad</span>
        <span className='text-[#6B7280] text-xs hover:text-[#AAED43] cursor-pointer transition-colors duration-150'>Términos</span>
      </div>
    </div>
  )
}

export default FooterBottom