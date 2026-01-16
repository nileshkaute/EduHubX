import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'
import NoteCard from '../components/cards/NoteCard'
import SortFilter from '../components/filters/SortFilter'
import RatingFilter from '../components/filters/RatingFilter'
import DownloadFilter from '../components/filters/DownloadFilter'
import { fetchNotes } from '../services/noteApi'

const Notes = () => {
  const { query } = useContext(SearchContext)
  const [allNotes, setAllNotes] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const getNotes = async () => {
      setIsLoading(true)
      try {
        const response = await fetchNotes({ search: query })
        setAllNotes(response.data)
      } catch (error) {
        console.error('Error fetching notes:', error)
      } finally {
        setIsLoading(false)
      }
    }
    getNotes()
  }, [query])

  const filteredNotes = allNotes; // Logic already handled by backend via query param

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
