import React, { useState } from 'react'
import Logo from './Logo'
import SearchBar from '../search/SearchBar'
import NavLinks from './NavLinks'
import FilterDropdown from './FilterDropdown'
import UserMenu from './UserMenu'
import MobileMenu from './MobileMenu'

const Navbar = ({ isLoggedIn = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Search Bar */}
          <SearchBar />

          {/* Navigation Links */}
          <NavLinks />

          {/* Filter Dropdown */}
          <FilterDropdown />

          {/* User Menu - Desktop */}
          <UserMenu isLoggedIn={isLoggedIn} />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <svg
                className={`w-6 h-6 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} isLoggedIn={isLoggedIn} />
    </nav>
  )
}

export default Navbar
