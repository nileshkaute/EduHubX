import React from 'react'

const DownloadFilter = () => {
    const filters = ['10k+ Downloads', '5k+ Downloads', '1k+ Downloads']

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Downloads</h3>
      <div className="space-y-2">
        {filters.map((filter, index) => (
          <label key={index} className="flex items-center cursor-pointer">
            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <span className="ml-3 text-sm text-gray-600">{filter}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default DownloadFilter
