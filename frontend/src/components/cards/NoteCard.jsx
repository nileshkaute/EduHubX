import React from 'react'

const NoteCard = ({ title, subject, author, rating, downloads }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-md">
            {subject}
          </span>
          <div className="flex items-center text-yellow-500 text-sm">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-gray-700">{rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">by {author}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-400 border-t pt-3">
          <span className="flex items-center">
             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
             </svg>
             {downloads}
          </span>
          <button className="text-blue-600 font-medium hover:text-blue-700">View</button>
        </div>
      </div>
    </div>
  )
}

export default NoteCard
