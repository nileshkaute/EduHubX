import React from 'react'

const NavLinks = () => {
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#notes', label: 'Notes' },
    { href: '#roadmaps', label: 'Roadmaps' },
    { href: '#practice', label: 'Practice' },
  ]

  return (
    <div className="hidden lg:flex items-center space-x-1">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}

export default NavLinks
