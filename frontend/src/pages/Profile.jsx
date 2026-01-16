import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Book, MessageSquare, Camera, Save } from 'lucide-react'

const Profile = () => {
  const { currentUser, updateProfile } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    education: currentUser?.education || '',
    photo: currentUser?.photo || ''
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    try {
      await updateProfile(formData)
      setMessage('Profile updated successfully!')
    } catch (err) {
      setMessage('Failed to update profile: ' + err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header/Cover */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-8 flex flex-col md:flex-row items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 bg-white rounded-2xl p-1 shadow-lg">
                <div className="w-full h-full bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-4xl font-bold overflow-hidden">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    formData.name.charAt(0) || 'U'
                  )}
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{formData.name}</h1>
              <p className="text-gray-500">{formData.email}</p>
            </div>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${message.includes('successfully') ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" /> Full Name
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" /> Email Address
                </label>
                <input 
                  type="email" 
                  name="email"
                  disabled
                  value={formData.email}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                  <Book className="w-4 h-4 text-gray-400" /> Education
                </label>
                <input 
                  type="text" 
                  name="education"
                  placeholder="e.g. B.Tech in Computer Science"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400" /> Bio
                </label>
                <textarea 
                  name="bio"
                  rows={5}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself, your skills, and what you're learning..."
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-gray-400" /> Photo URL
                </label>
                <input 
                  type="text" 
                  name="photo"
                  placeholder="Link to your profile picture"
                  value={formData.photo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2 pt-6 border-t border-gray-50 mt-4 flex justify-end">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
