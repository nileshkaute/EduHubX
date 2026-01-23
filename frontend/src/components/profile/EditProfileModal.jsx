import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { X, Camera } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

const EditProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    education: '',
    photo: ''
  })

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        bio: currentUser.bio || '',
        education: currentUser.education || '',
        photo: currentUser.photo || ''
      })
    }
  }, [currentUser, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      // Preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let photoUrl = formData.photo

      if (imageFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('poster', imageFile)
        
        const token = localStorage.getItem('token')
        const { data } = await axios.post('http://localhost:5000/api/auth/upload-avatar', uploadFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        })
        // Construct full URL if needed, or backend returns usable path
        // Assuming backend returns relative path "uploads/..." and we prepend base URL for display usually
        // But for saving in DB, we'll save the returned path or full URL. 
        // Let's save the full URL to be consistent with Google Auth photos
        photoUrl = `http://localhost:5000/${data.url}`
      }

      await updateProfile({ ...formData, photo: photoUrl })
      toast.success('Profile updated successfully!')
      onClose()
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 bg-gray-100 flex items-center justify-center">
                {formData.photo ? (
                  <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-blue-600">
                    {formData.name.charAt(0) || 'U'}
                  </span>
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Camera className="w-6 h-6" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
            <p className="text-xs text-gray-500 font-medium whitespace-nowrap">Click avatar to change photo</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Ex: Nilesh Kaute"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Ex: Computer Engineering, SPPU"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
             <button
               type="button"
               onClick={onClose}
               className="flex-1 py-3 px-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
             >
               Cancel
             </button>
             <button
               type="submit"
               disabled={loading}
               className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-shadow hover:shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
             >
               {loading ? (
                 <>
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                   Saving...
                 </>
               ) : (
                 'Save Changes'
               )}
             </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfileModal
