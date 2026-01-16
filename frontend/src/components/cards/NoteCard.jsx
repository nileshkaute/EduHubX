import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Download, Star } from 'lucide-react'

const NoteCard = ({ _id, id, title, subject, author, uploadedBy, rating, avgRating, downloads }) => {
  const displayId = _id || id;
  const displayAuthor = uploadedBy?.name || author;
  const displayRating = avgRating || rating;
  
  return (
    <Link to={`/notes/${displayId}`} className="block group">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <FileText className="w-6 h-6" />
          </div>
          <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
            {subject}
          </span>
        </div>

        <h3 className="text-gray-900 font-bold text-lg mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
           <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 uppercase overflow-hidden text-[10px]">
             {displayAuthor?.charAt(0)}
           </div>
           <span>{displayAuthor}</span>
        </div>

        <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
            <span className="text-sm font-bold text-gray-900">{displayRating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
             <Download className="w-3.5 h-3.5" />
             <span className="text-xs font-medium">{downloads}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
