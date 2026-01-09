import React, { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-blue-600">
              EduHubX
            </a>
          </div>

          {/* Menu - Desktop */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#courses"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Courses
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#home"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              Home
            </a>
            <a
              href="#about"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              About
            </a>
            <a
              href="#courses"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              Courses
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              Contact
            </a>
            <button className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
