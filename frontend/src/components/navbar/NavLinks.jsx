import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Upload, Map, Target } from 'lucide-react'

const NavLinks = () => {
  const links = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/notes', label: 'Notes', icon: BookOpen },
    { path: '/add-note', label: 'Upload', icon: Upload },
    { path: '#roadmaps', label: 'Roadmaps', icon: Map },
    { path: '#practice', label: 'Practice', icon: Target },
  ]

  return (
    <div className="hidden lg:flex items-center space-x-1">
      {links.map((link) => {
        const Icon = link.icon
        return (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive ? 'text-blue-600 bg-gray-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            <Icon size={16} />
            {link.label}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
