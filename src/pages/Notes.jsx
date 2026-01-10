import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'
import NoteCard from '../components/cards/NoteCard'
import SortFilter from '../components/filters/SortFilter'
import RatingFilter from '../components/filters/RatingFilter'
import DownloadFilter from '../components/filters/DownloadFilter'

const Notes = () => {
  const { query } = useContext(SearchContext)

  // Mock Data (Expanded)
  const allNotes = [
    { id: 1, title: 'Complete ReactJS Guide 2024', subject: 'Web Dev', author: 'Nilesh', rating: 4.8, downloads: '1.2k' },
    { id: 2, title: 'Data Structures & Algorithms', subject: 'CS Core', author: 'Rahul', rating: 4.9, downloads: '5k' },
    { id: 3, title: 'Operating System Notes', subject: 'CS Core', author: 'Ankit', rating: 4.5, downloads: '800' },
    { id: 4, title: 'Computer Networks', subject: 'CS Core', author: 'Priya', rating: 4.6, downloads: '2k' },
    { id: 5, title: 'JavaScript Advanced Concepts', subject: 'Web Dev', author: 'Amit', rating: 4.7, downloads: '3.5k' },
    { id: 6, title: 'Machine Learning Basics', subject: 'AI/ML', author: 'Sara', rating: 4.4, downloads: '900' },
  ]

  // Filter based on search query
  const filteredNotes = allNotes.filter(note => 
    note.title.toLowerCase().includes(query.toLowerCase()) ||
    note.subject.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-24">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold text-gray-800">Filters</h2>
               <button className="text-sm text-blue-600 hover:text-blue-800">Reset</button>
             </div>
             
             <SortFilter />
             <div className="border-t border-gray-100 my-4"></div>
             <RatingFilter />
             <div className="border-t border-gray-100 my-4"></div>
             <DownloadFilter />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {query ? `Search Results for "${query}"` : 'All Study Notes'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Showing {filteredNotes.length} results
            </p>
          </div>

          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map(note => (
                <NoteCard key={note.id} {...note} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No notes found matching your criteria.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  )
}

export default Notes
