import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Download, Star, Edit2, Trash2 } from 'lucide-react'

const MyNoteCard = ({ _id, title, subject, avgRating, downloads, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
          <FileText className="w-6 h-6" />
        </div>
        <div className="flex gap-2 text-gray-400">
           <span className="text-xs font-semibold">Ready for Review</span>
        </div>
      </div>

      <Link to={`/notes/${_id}`} className="block group">
        <h3 className="text-gray-900 font-bold text-lg mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <span className="text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-4 block">
          {subject}
        </span>
      </Link>

      <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
          <span className="text-sm font-bold text-gray-900">{avgRating || 0}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
           <Download className="w-3.5 h-3.5" />
           <span className="text-xs font-medium">{downloads}</span>
        </div>
      </div>
    </div>
  )
}

export default MyNoteCard
