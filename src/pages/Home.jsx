import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'
import SearchResults from '../components/search/SearchResults'
import EmptyState from '../components/search/EmptyState'

const Home = () => {
  const { query } = useContext(SearchContext)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {query ? (
        <SearchResults />
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome to EduHubX</h1>
          <p className="text-lg text-gray-600">Start by searching for notes, roadmaps, or questions above.</p>
          {/* Default Home Content will go here (Step 2) */}
        </div>
      )}
    </div>
  )
}

export default Home
