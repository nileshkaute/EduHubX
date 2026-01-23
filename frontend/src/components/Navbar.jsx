import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm transition-colors border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity flex items-center gap-2">
              EduHubX
            </a>
          </div>

          {/* Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-stone-600 hover:text-emerald-700 font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-stone-600 hover:text-emerald-700 font-medium transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#courses"
              className="text-stone-600 hover:text-emerald-700 font-medium transition-colors duration-200"
            >
              Courses
            </a>
            <a
              href="#contact"
              className="text-stone-600 hover:text-emerald-700 font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block ml-4">
            <button className="bg-emerald-700 text-white px-5 py-2 rounded-xl hover:bg-emerald-800 transition-colors duration-200 shadow-sm shadow-emerald-200 font-medium">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-emerald-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#home"
              className="block px-3 py-2 rounded-xl text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              className="block px-3 py-2 rounded-xl text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
            >
              About
            </a>
            <a
              href="#courses"
              className="block px-3 py-2 rounded-xl text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
            >
              Courses
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 rounded-xl text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
            >
              Contact
            </a>
            <button className="w-full mt-2 bg-emerald-700 text-white px-4 py-2 rounded-xl hover:bg-emerald-800 font-medium">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
