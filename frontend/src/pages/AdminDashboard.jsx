import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { Users, FileText, Download, Trash2, Search, Filter, ShieldCheck } from 'lucide-react'
import StatsCard from '../components/dashboard/StatsCard'
import { fetchNotes, deleteNote } from '../services/noteApi'

const AdminDashboard = () => {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('notes') // 'notes' or 'users'
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalNotes: 0,
    totalDownloads: 0
  })
  const [allNotes, setAllNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const [statsRes, notesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/admin/stats', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetchNotes({ limit: 100 }) // Fetch more for admin
        ])
        setStats(statsRes.data.data)
        setAllNotes(notesRes.data)
      } catch (err) {
        console.error('Error fetching admin data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('ADMIN ACTION: Are you sure you want to delete this note? This cannot be undone.')) {
      try {
        await deleteNote(id)
        setAllNotes(allNotes.filter(n => n._id !== id))
        setStats(prev => ({ ...prev, totalNotes: prev.totalNotes - 1 }))
        alert('Note deleted successfully by admin')
      } catch (err) {
        alert('Failed to delete note')
      }
    }
  }

  const statItems = [
    { title: 'Total Registered Users', value: stats.totalUsers, icon: Users, color: 'bg-purple-600' },
    { title: 'Total Active Notes', value: stats.totalNotes, icon: FileText, color: 'bg-blue-600' },
    { title: 'Global Downloads', value: stats.totalDownloads, icon: Download, color: 'bg-green-600' },
  ]

  const filteredNotes = allNotes.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.uploadedBy?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-red-600" />
            Admin Moderation Panel
          </h1>
          <p className="text-gray-500 mt-1">Global oversight and content moderation tools.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statItems.map((item, idx) => (
          <StatsCard key={idx} {...item} />
        ))}
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('notes')}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'notes' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
        >
          Content Moderation
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
        >
          User Management
        </button>
      </div>

      {activeTab === 'notes' ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in duration-300">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">Content Moderation</h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by title, subject, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Note Title</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4 text-center">Downloads</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredNotes.map((note) => (
                  <tr key={note._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 line-clamp-1">{note.title}</span>
                        <span className="text-[10px] text-gray-400 mt-0.5">ID: {note._id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-600">
                           {note.uploadedBy?.name?.charAt(0) || 'U'}
                         </div>
                         <span className="text-sm text-gray-600 font-medium">{note.uploadedBy?.name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold uppercase tracking-wide">
                        {note.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-bold text-gray-700">
                      {note.downloads}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleDelete(note._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Note"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredNotes.length === 0 && !loading && (
              <div className="py-20 text-center">
                <p className="text-gray-500">No content found matching those criteria.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-20 text-center animate-in fade-in duration-300">
          <Users className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-500 mt-2">The ability to suspend users or change roles is coming soon.</p>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
