import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import EditProfileModal from '../profile/EditProfileModal'

const UserMenu = () => {
  const { currentUser, logout } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  if (!currentUser) {
    return (
      <div className="hidden md:flex items-center space-x-3">
        <button className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors">
          Login
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Sign Up
        </button>
      </div>
    )
  }

  const userInitial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'

  return (
    <div className="hidden md:flex items-center space-x-4">
      {/* User Action Buttons */}
      <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors" title="Add Note">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      
      {/* Profile Menu */}
      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all border-2 border-transparent hover:border-blue-100 overflow-hidden"
        >
          {currentUser.photo ? (
            <img src={currentUser.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-bold">{userInitial}</span>
          )}
        </button>

        {isProfileOpen && (
          <>
            {/* Backdrop for closing */}
            <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
            
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl z-50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</p>
                <p className="text-[11px] text-gray-500 truncate">{currentUser.email}</p>
              </div>
              
              <div className="p-2">
                <button
                  onClick={() => {
                    setIsEditModalOpen(true)
                    setIsProfileOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Edit Profile
                </button>
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  My Notes
                </button>
              </div>

              <div className="p-2 border-t border-gray-100">
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </div>
  )
}

export default UserMenu
