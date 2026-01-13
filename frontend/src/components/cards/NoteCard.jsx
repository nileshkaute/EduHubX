import React from 'react'
import { Link } from 'react-router-dom'

const NoteCard = ({ id, title, subject, author, rating, downloads }) => {
  return (
    <Link to={`/notes/${id}`} className="block group">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
            {subject}
          </span>
        </div>

        <h3 className="text-gray-900 font-bold text-lg mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
           <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 uppercase overflow-hidden">
             {author.charAt(0)}
           </div>
           <span>{author}</span>
        </div>

        <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-bold text-gray-900">{rating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
             </svg>
             <span className="text-xs font-medium">{downloads}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
