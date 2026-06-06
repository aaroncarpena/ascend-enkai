import React from 'react'
import logo from '../../../assets/Logo2-removebg-preview.png'

const FooterBrand = () => {
  return (
    <div className="flex flex-col gap-0">
      <img
        src={logo}
        alt="Ascend-Enkai"
        className="-mb-2 h-60 w-fit max-w-[400px] object-contain drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]"
      />
      <p className="max-w-xs text-sm leading-relaxed text-[#6B7280]">
        Encuentra y organiza partidos cerca de ti. Futbol, padel, basket y mas deportes en tu zona.
      </p>
    </div>
  )
}

export default FooterBrand
