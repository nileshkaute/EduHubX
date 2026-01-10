import React from 'react'

const RoadmapCard = ({ title, description, steps, colorFrom = 'from-purple-500', colorTo = 'to-blue-500' }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colorFrom} ${colorTo}`}></div>
      <div className="bg-white p-5 h-full flex flex-col">
        <div className="mb-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorFrom} ${colorTo} flex items-center justify-center text-white mb-3 shadow-sm`}>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
             </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
        </div>
        <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-3">{description}</p>
        <div className="flex items-center text-xs text-gray-400 font-medium uppercase tracking-wide">
          <span>{steps} Steps</span>
          <span className="mx-2">•</span>
          <span>Updated recently</span>
        </div>
      </div>
    </div>
  )
}

export default RoadmapCard
