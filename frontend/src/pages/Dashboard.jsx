import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { FileText, Download, Star, User, BookOpen, Clock } from 'lucide-react'
import StatsCard from '../components/dashboard/StatsCard'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { currentUser } = useAuth()
  const [stats, setStats] = useState({
    totalUploads: 0,
    totalDownloads: 0,
    avgRating: 'N/A'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:5000/api/auth/stats', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setStats(res.data.data)
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statItems = [
    { title: 'Total Uploads', value: stats.totalUploads, icon: FileText, color: 'bg-blue-600' },
    { title: 'Total Downloads', value: stats.totalDownloads, icon: Download, color: 'bg-green-600' },
    { title: 'Average Rating', value: stats.avgRating, icon: Star, color: 'bg-yellow-500' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {currentUser?.name}!</h1>
          <p className="text-gray-500 mt-1">Here's an overview of your activity and content performance.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/add-note" 
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Upload New Note
          </Link>
          <Link 
            to="/profile" 
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statItems.map((item, idx) => (
          <StatsCard key={idx} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Links / Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/my-notes" className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 group">
                <BookOpen className="w-6 h-6 text-gray-400 mb-2 group-hover:text-blue-600" />
                <h3 className="font-bold text-gray-900">Manage My Notes</h3>
                <p className="text-sm text-gray-500">Edit or delete your uploaded content.</p>
              </Link>
              <Link to="/notes" className="p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 group">
                <User className="w-6 h-6 text-gray-400 mb-2 group-hover:text-blue-600" />
                <h3 className="font-bold text-gray-900">Browse Community</h3>
                <p className="text-sm text-gray-500">Find notes from other students.</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Summary Sidebar */}
        <div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-600 text-3xl font-bold">
              {currentUser?.photo ? (
                <img src={currentUser.photo} alt={currentUser.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                currentUser?.name?.charAt(0) || 'U'
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{currentUser?.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{currentUser?.email}</p>
            <div className="bg-gray-50 p-4 rounded-xl text-left">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Bio</p>
              <p className="text-sm text-gray-600 line-clamp-3 italic">
                {currentUser?.bio || "No bio added yet. Tell people about yourself!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
