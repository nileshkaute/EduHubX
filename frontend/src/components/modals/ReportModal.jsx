import React, { useState } from 'react'
import { X, AlertTriangle } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const ReportModal = ({ isOpen, onClose, noteId, noteTitle }) => {
  const [reason, setReason] = useState('Inappropriate Content')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const reasons = [
    'Inappropriate Content',
    'Copyright Violation',
    'Spam or Misleading',
    'Incorrect Information',
    'Other'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `http://localhost:5000/api/reports/${noteId}`,
        { reason, description },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success('Report submitted successfully')
      onClose()
      setDescription('')
      setReason(reasons[0])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit report')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-red-50">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={20} />
            <h2 className="text-xl font-bold">Report Note</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-gray-600">
            You are reporting <span className="font-semibold text-gray-900">"{noteTitle}"</span>.
            Please select a reason.
          </p>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            >
              {reasons.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Provide more details..."
            />
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
               className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
             >
               {loading ? 'Submitting...' : 'Submit Report'}
             </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReportModal
