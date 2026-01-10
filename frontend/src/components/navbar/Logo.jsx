import React from 'react'

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <a href="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">E</span>
        </div>
        <span className="text-2xl font-bold text-gray-900 hidden sm:inline">
          EduHubX
        </span>
      </a>
    </div>
  )
}

export default Logo
