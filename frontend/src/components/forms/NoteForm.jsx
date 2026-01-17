import React, { useState } from 'react'
import FileInput from './FileInput'
import { createNote } from '../../services/noteApi'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const NoteForm = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    file: null,
    poster: null,
    bottomColor: '#ff5722',
    titleColor: '#1f2937',
    textColor: '#4b5563'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.file) {
      alert("Please select a PDF file!")
      return
    }

    setIsSubmitting(true)
    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('subject', formData.subject)
      data.append('description', formData.description)
      data.append('pdf', formData.file)
      data.append('bottomColor', formData.bottomColor)
      data.append('titleColor', formData.titleColor)
      data.append('textColor', formData.textColor)
      
      if (formData.poster) {
        data.append('poster', formData.poster)
      }

      await createNote(data)
      alert('Note uploaded successfully!')
      navigate('/notes')
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Upload failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      
      {/* Read-only User Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Uploaded By</label>
        <input 
          type="text" 
          value={currentUser?.name || "Anonymous"} 
          disabled 
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500 sm:text-sm"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Subject</label>
        <select 
          name="subject" 
          value={formData.subject}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
          required
        >
          <option value="">Select a Subject</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
          <option value="Operating Systems">Operating Systems</option>
          <option value="Database Management">Database Management</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Complete React Guide 2024"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea 
          name="description" 
          rows={4} 
          value={formData.description}
          onChange={handleChange}
          placeholder="Briefly describe what this note covers..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* File Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileInput 
          label="Note PDF" 
          accept=".pdf" 
          onChange={(file) => handleFileChange('file', file)}
          icon={
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        />
        <FileInput 
          label="Cover Image (Optional)" 
          accept="image/*" 
          onChange={(file) => handleFileChange('poster', file)}
          icon={
            <svg className="mx-auto h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
      </div>

      {/* Color Customization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bottom Bar Color</label>
          <div className="flex items-center gap-3">
             <input 
               type="color" 
               name="bottomColor" 
               value={formData.bottomColor || '#ff5722'} 
               onChange={handleChange}
               className="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer"
             />
             <span className="text-sm text-gray-500">{formData.bottomColor || '#ff5722'}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title Color</label>
          <div className="flex items-center gap-3">
             <input 
               type="color" 
               name="titleColor" 
               value={formData.titleColor || '#1f2937'} 
               onChange={handleChange}
               className="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer"
             />
             <span className="text-sm text-gray-500">{formData.titleColor || '#1f2937'}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
          <div className="flex items-center gap-3">
             <input 
               type="color" 
               name="textColor" 
               value={formData.textColor || '#4b5563'} 
               onChange={handleChange}
               className="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer"
             />
             <span className="text-sm text-gray-500">{formData.textColor || '#4b5563'}</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
        >
          {isSubmitting ? 'Uploading...' : 'Upload Note'}
        </button>
      </div>

    </form>
  )
}

export default NoteForm
