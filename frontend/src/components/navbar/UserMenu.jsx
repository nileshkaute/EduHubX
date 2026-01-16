import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { User, FileText, LogOut, ChevronDown, ShieldCheck } from 'lucide-react'

const UserMenu = () => {
  const { currentUser, logout } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  if (!currentUser) {
    return (
      <div className="hidden md:flex items-center space-x-3">
        <Link 
          to="/login"
          className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
        >
          Login
        </Link>
        <Link 
          to="/signup"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          Sign Up
        </Link>
      </div>
    )
  }

  const userInitial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'

  return (
    <div className="hidden md:flex items-center space-x-4">
      {/* Profile Menu */}
      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all border-2 border-transparent group-hover:border-blue-100 overflow-hidden shadow-sm">
            {currentUser.photo ? (
              <img src={currentUser.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold">{userInitial}</span>
            )}
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
        </button>

        {isProfileOpen && (
          <>
            {/* Backdrop for closing */}
            <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
            
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl z-50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</p>
                  {currentUser.role === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-red-600" />}
                </div>
                <p className="text-[11px] text-gray-500 truncate">{currentUser.email}</p>
              </div>
              
              <div className="p-2">
                {(currentUser.role === 'admin' || currentUser.role === 'Admin') && (
                  <Link
                    to="/admin"
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl transition-colors text-sm font-bold border border-red-100 mb-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    System Admin Panel
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/my-notes"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors text-sm font-medium"
                >
                  <FileText className="w-4 h-4" />
                  My Notes
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  Profile Settings
                </Link>
              </div>

              <div className="p-2 border-t border-gray-100">
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default UserMenu
