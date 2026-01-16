import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { fetchNotes, deleteNote } from '../services/noteApi'
import MyNoteCard from '../components/dashboard/MyNoteCard'
import { Plus, Search, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'

const MyNotes = () => {
  const { currentUser } = useAuth()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const getMyNotes = async () => {
    if (!currentUser?._id) return
    try {
      const response = await fetchNotes({ uploadedBy: currentUser._id })
      setNotes(response.data)
    } catch (err) {
      console.error('Error fetching my notes:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMyNotes()
  }, [currentUser])

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Uploaded Notes</h1>
          <p className="text-gray-500 mt-1">Manage and track the performance of your shared content.</p>
        </div>
        <Link 
          to="/add-note" 
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          <Plus className="w-5 h-5" />
          Upload New
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search within my notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-100 rounded-2xl"></div>)}
        </div>
      ) : filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map(note => (
            <MyNoteCard 
              key={note._id} 
              {...note} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No notes found</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            {searchTerm ? "Try searching for something else." : "You haven't uploaded any notes yet. Share your first note today!"}
          </p>
          {!searchTerm && (
            <Link to="/add-note" className="inline-block mt-6 text-blue-600 font-bold hover:underline">
              Start Uploading →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default MyNotes
