import React from 'react'

const MobileMenu = ({ isOpen, isLoggedIn = false }) => {
  if (!isOpen) return null

  return (
    <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {/* Navigation Links */}
        <a
          href="#home"
          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          Home
        </a>
        <a
          href="#notes"
          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          Notes
        </a>
        <a
          href="#roadmaps"
          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          Roadmaps
        </a>
        <a
          href="#practice"
          className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          Practice
        </a>

        {/* Divider */}
        <div className="my-2 border-t border-gray-200"></div>

        {!isLoggedIn ? (
          <>
            {/* Auth Buttons for Mobile */}
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium">
              Login
            </button>
            <button className="w-full bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              Sign Up
            </button>
            <button className="w-full border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.449-.901 4.711-2.384 6.469C9.534 15.766 7.566 16.75 5 16.75c-.359 0-.718-.022-1.073-.065.169.574.446 1.12.81 1.597.375.461.818.835 1.315 1.1a7.5 7.5 0 0 0 2.948.576A8.236 8.236 0 0 0 13 19.25h1a9.964 9.964 0 0 0 5.546-1.691 6.46 6.46 0 0 0 1.203-1.413 6.376 6.376 0 0 0 .923-1.417 5.738 5.738 0 0 0 .536-1.335q.082-.259.157-.541.054-.227.089-.457.076-.526.076-1.056a9.42 9.42 0 0 0-.139-1.626z" />
              </svg>
              <span>Google</span>
            </button>
          </>
        ) : (
          <>
            {/* User Actions for Mobile */}
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium">
              Add Note
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium">
              My Uploads
            </button>
            <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium">
              Favorites
            </button>

            <div className="my-2 border-t border-gray-200"></div>

            {/* Profile Menu for Mobile */}
            <a
              href="#profile"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              Profile
            </a>
            <a
              href="#mynotes"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              My Notes
            </a>
            <a
              href="#settings"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              Settings
            </a>
            <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium border-t border-gray-200 mt-2">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default MobileMenu
