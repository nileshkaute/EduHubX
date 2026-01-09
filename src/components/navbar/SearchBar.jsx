import React, { useState } from 'react'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Add search functionality here
  }

  return (
    <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search Notes, Roadmaps, Questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </form>
  )
}

export default SearchBar
