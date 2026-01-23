import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Download, Star, Flag } from 'lucide-react'
import ReportModal from '../modals/ReportModal'

const NoteCard = ({ _id, id, title, subject, author, uploadedBy, rating, avgRating, downloads, posterUrl, description, views, bottomColor, titleColor, textColor, ratingsCount }) => {
  const displayId = _id || id;
  const displayAuthor = uploadedBy?.name || author;
  const displayRating = avgRating || rating;
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  return (
    <>
      <div className="block group relative">
        <Link to={`/notes/${displayId}`} className="block h-full">
          <div className="bg-white rounded-[20px] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
            
            {/* 1. Header Image (or Fallback Decoration) */}
            <div className="h-40 overflow-hidden relative bg-stone-100">
              <img 
                src={posterUrl || "https://via.placeholder.com/400x300?text=Note+Preview"} 
                alt={title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=random&size=400`
                }}
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-stone-700 shadow-sm">
                {subject}
              </div>
            </div>

            {/* 2. Body Content */}
            <div className="p-5 flex-grow bg-white">
              <div className="text-center mb-2">
                <span className="text-[10px] font-medium text-emerald-600 uppercase tracking-wider">
                  1 week ago
                </span>
                <h3 
                  className="text-xl font-bold mt-1 mb-2 leading-snug line-clamp-2 font-serif"
                  style={{ color: titleColor || '#1c1917' }} // stone-900
                >
                  {title}
                </h3>
                <p 
                  className="text-xs line-clamp-3 leading-relaxed"
                  style={{ color: textColor || '#57534e' }} // stone-600
                >
                  {description || `Detailed study notes for ${subject}. Covers key concepts, examples, and important formulas.`}
                  {/* Using description if available or fallback text */}
                </p>
              </div>
            </div>

            {/* 3. Solid Colored Footer */}
            <div 
              className="py-3 px-5 flex justify-between gap-3 items-center text-white"
              style={{ backgroundColor: bottomColor || '#059669' }} // emerald-600 default
            >
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4" />
                <span className="font-bold text-md">{downloads}</span>
                <span className="text-[10px] uppercase font-medium opacity-90 ml-0.5">Downloads</span>
              </div>
              
              <div className="text-white/90 hover:text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors border border-white/30 px-3 py-1 rounded-full text-[10px] uppercase bg-white/10 hover:bg-white/20">
                Download
              </div>
            </div>

          </div>
        </Link>
        
        {/* Report Button - Outside the Link to prevent navigation when clicking it */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsReportOpen(true);
          }}
          className="absolute top-3 left-3 bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-500 p-1.5 rounded-full shadow-sm backdrop-blur-sm transition-all z-10"
          title="Report this note"
        >
          <Flag size={14} />
        </button>
      </div>

      <ReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
        noteId={displayId}
        noteTitle={title}
      />
    </>
  )
}

export default NoteCard
