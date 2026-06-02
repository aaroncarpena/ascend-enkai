import React from 'react'

const FeatureCard = ({ category, title, description }) => {
  return (
    <div className="rounded-[1.75rem] bg-white p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.12)]">
      <span className="inline-flex rounded-full bg-[#E9F8D8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#1F1F1F]">
        {category}
      </span>
      <h3 className="mt-6 text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-slate-600">{description}</p>
    </div>
  )
}

export default FeatureCard
