import React, { useState } from 'react'

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('Highest Rated')

  const filters = ['Highest Rated', 'Most Downloaded', 'Latest']

  return (
    <div className="hidden md:relative md:inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2 transition-colors duration-200"
      >
        <span className="text-sm font-medium">{selectedFilter}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilter(filter)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                selectedFilter === filter
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-700'
              } first:rounded-t-lg last:rounded-b-lg`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
