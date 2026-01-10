import React from 'react'

const EmptyState = ({ message = "No results found" }) => {
  return (
    <div className="text-center py-12">
      <div className="mb-4 text-gray-300">
        <svg className="mx-auto w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900">{message}</h3>
      <p className="mt-2 text-sm text-gray-500">Try adjusting your search terms.</p>
    </div>
  )
}

export default EmptyState
