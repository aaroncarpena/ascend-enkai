import React from 'react'
import FooterBrand from './FooterBrand'
import FooterLinks from './FooterLinks'
import FooterBottom from './FooterBottom'
const Footer = () => {
  return (
    <footer className='bg-black border-t border-[#E5E7EB] mt-auto'>
      <div className='max-w-5xl mx-auto px-6 py-10 flex flex-col gap-8'>

        <div className='flex items-start justify-between gap-8 flex-wrap'>
          <FooterBrand />
          <FooterLinks />
        </div>

        <FooterBottom />

      </div>
    </footer>
  )
}

export default Footer