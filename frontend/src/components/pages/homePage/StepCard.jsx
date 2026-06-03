import React from 'react'

const StepCard = ({ index, title, description }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-[#F7FFF8] p-5 shadow-inner shadow-slate-100">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#AAED43] text-sm font-bold text-[#1a2e00]">{index}</span>
      <h3 className="mt-4 text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  )
}

export default StepCard
