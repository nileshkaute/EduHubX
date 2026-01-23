import React from 'react'

const NoteSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-stone-200 w-full"></div>
      
      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-6 bg-stone-200 rounded w-3/4"></div>
        
        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-4 bg-stone-200 rounded w-full"></div>
          <div className="h-4 bg-stone-200 rounded w-5/6"></div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-stone-200 rounded-full"></div>
          <div className="h-6 w-16 bg-stone-200 rounded-full"></div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 mt-4 border-t border-stone-100">
          <div className="h-8 w-24 bg-stone-200 rounded-lg"></div>
          <div className="h-8 w-8 bg-stone-200 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default NoteSkeleton
