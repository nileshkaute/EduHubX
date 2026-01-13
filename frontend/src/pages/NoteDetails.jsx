import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const NoteDetails = () => {
  const { id } = useParams()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setNote({
        id,
        title: id === '1' ? 'Complete ReactJS Guide 2024' : 'Technical Documentation',
        subject: 'Web Development',
        author: 'Nilesh Kaute',
        rating: 4.8,
        downloads: '1.2k',
        pages: 45,
        description: 'This comprehensive guide covers everything from React basics to advanced patterns like Compound Components and Render Props. It also includes sections on Hooks, Context API, and Performance Optimization.',
        tags: ['React', 'JavaScript', 'Frontend'],
        lastUpdated: 'Jan 10, 2024',
        content: 'This is a preview of the note content. In a real app, this would be a PDF worker or a rendered markdown/text preview.'
      })
      setLoading(false)
    }, 800)
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-64 bg-gray-200 rounded-xl"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-8 flex items-center text-sm text-gray-500">
        <Link to="/notes" className="hover:text-blue-600">Notes</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium truncate">{note.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{note.title}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                  {note.author.charAt(0)}
                </div>
                <span>{note.author}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                ⭐ <span className="font-bold text-gray-900">{note.rating}</span>
              </div>
              <div>{note.pages} Pages</div>
              <div>Updated {note.lastUpdated}</div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {note.description}
            </p>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">Note Preview</h3>
              <p className="text-gray-500 italic text-sm">
                "{note.content}"
              </p>
            </div>
          </section>
        </div>

        {/* Action Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <div className="text-center mb-6">
               <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4">
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                 </svg>
               </div>
               <h3 className="text-2xl font-bold text-gray-900">{note.downloads}</h3>
               <p className="text-gray-500 text-sm">Total Downloads</p>
            </div>

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-4 shadow-lg shadow-blue-200">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
               Download PDF
            </button>

            <button className="w-full border border-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors mb-6">
               Save for Later
            </button>

            <div className="space-y-4 pt-6 border-t border-gray-50 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">File size</span>
                <span className="text-gray-900 font-medium">4.2 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Format</span>
                <span className="text-gray-900 font-medium">PDF</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default NoteDetails
