import React, { useContext } from 'react'
import { SearchContext } from '../../context/SearchContext'

const SearchResults = () => {
  const { query } = useContext(SearchContext)

  if (!query) return null

  // Mock data for now - will be replaced with real data integration
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for results */}
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <p className="text-gray-600">Results will appear here...</p>
        </div>
      </div>
    </div>
  )
}

export default SearchResults
