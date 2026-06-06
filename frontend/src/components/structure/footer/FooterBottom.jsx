import React from 'react'

const FooterBottom = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E7EB] pt-5">
      <span className="text-xs text-[#6B7280]">
        (c) 2026 Ascend-Enkai. Todos los derechos reservados.
      </span>
      <div className="flex gap-4">
        <span className="cursor-pointer text-xs text-[#6B7280] transition-colors duration-150 hover:text-[#AAED43]">Privacidad</span>
        <span className="cursor-pointer text-xs text-[#6B7280] transition-colors duration-150 hover:text-[#AAED43]">Terminos</span>
      </div>
    </div>
  )
}

export default FooterBottom
