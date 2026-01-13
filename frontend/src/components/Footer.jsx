import React from 'react'
import { Link } from 'react-router-dom'
import { Twitter, Github, GraduationCap, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Blog', path: '/blog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'All Notes', path: '/notes' },
        { label: 'Roadmaps', path: '/' },
        { label: 'Practice', path: '/' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', path: '/contact' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Privacy Policy', path: '/privacy' },
      ],
    },
  ]

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                EduHubX
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Empowering students with quality notes and learning paths to accelerate their academic journey.
            </p>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs flex items-center gap-1">
            © {currentYear} EduHubX. All rights reserved. Made with <Heart size={12} className="text-red-500 fill-current" /> for students.
          </p>
          <div className="flex gap-6">
             <a href="#" className="text-gray-400 hover:text-blue-600 transition-all hover:scale-110">
               <span className="sr-only">Twitter</span>
               <Twitter size={20} />
             </a>
             <a href="#" className="text-gray-400 hover:text-blue-600 transition-all hover:scale-110">
               <span className="sr-only">GitHub</span>
               <Github size={20} />
             </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
