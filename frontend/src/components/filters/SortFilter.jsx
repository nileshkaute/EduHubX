import React from 'react'

const SortFilter = () => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Sort By</h3>
      <div className="space-y-2">
         <select className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500">
            <option>Latest</option>
            <option>Most Popular</option>
            <option>Highest Rated</option>
         </select>
      </div>
    </div>
  )
}

export default SortFilter
