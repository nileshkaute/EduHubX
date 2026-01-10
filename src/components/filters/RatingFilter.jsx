import React from 'react'

const RatingFilter = () => {
  const ratings = [5, 4, 3, 2, 1]

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Rating</h3>
      <div className="space-y-2">
        {ratings.map(rating => (
          <label key={rating} className="flex items-center cursor-pointer">
            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <div className="ml-3 flex items-center">
               <span className="text-yellow-400 flex">
                 {[...Array(rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                 ))}
               </span>
               <span className="ml-2 text-sm text-gray-600">& Up</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

export default RatingFilter
