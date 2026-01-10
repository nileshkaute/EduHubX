import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinks = () => {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/notes', label: 'Notes' },
    { path: '/add-note', label: 'Upload' },
    { path: '#roadmaps', label: 'Roadmaps' },
    { path: '#practice', label: 'Practice' },
  ]

  return (
    <div className="hidden lg:flex items-center space-x-1">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              isActive ? 'text-blue-600 bg-gray-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  )
}

export default NavLinks
