import React, { useState } from 'react'

const UserMenu = ({ isLoggedIn = false }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="hidden md:flex items-center space-x-3">
        <button className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors">
          Login
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Sign Up
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.449-.901 4.711-2.384 6.469C9.534 15.766 7.566 16.75 5 16.75c-.359 0-.718-.022-1.073-.065.169.574.446 1.12.81 1.597.375.461.818.835 1.315 1.1a7.5 7.5 0 0 0 2.948.576A8.236 8.236 0 0 0 13 19.25h1a9.964 9.964 0 0 0 5.546-1.691 6.46 6.46 0 0 0 1.203-1.413 6.376 6.376 0 0 0 .923-1.417 5.738 5.738 0 0 0 .536-1.335q.082-.259.157-.541.054-.227.089-.457.076-.526.076-1.056a9.42 9.42 0 0 0-.139-1.626z" />
          </svg>
          <span className="text-sm">Google</span>
        </button>
      </div>
    )
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      {/* User Action Buttons */}
      <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors" title="Add Note">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors" title="My Uploads">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
      <button className="p-2 text-gray-700 hover:text-red-600 transition-colors" title="Favorites">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Profile Menu */}
      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <span className="text-sm font-bold">U</span>
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-900">User Name</p>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>
            <a
              href="#profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-sm"
            >
              Profile
            </a>
            <a
              href="#mynotes"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-sm"
            >
              My Notes
            </a>
            <a
              href="#settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-sm"
            >
              Settings
            </a>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors text-sm border-t border-gray-200">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserMenu
