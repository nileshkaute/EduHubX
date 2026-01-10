import React, { useRef, useState } from 'react'

const FileInput = ({ label, accept, onChange, icon }) => {
  const [fileName, setFileName] = useState('')
  const inputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
      onChange(file)
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div 
        onClick={() => inputRef.current.click()}
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
      >
        <div className="space-y-1 text-center">
          {icon || (
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <div className="flex text-sm text-gray-600 justify-center">
            <span className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
              <span className="px-1">{fileName ? 'Change file' : 'Upload a file'}</span>
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {fileName ? fileName : 'PNG, JPG, PDF up to 10MB'}
          </p>
        </div>
      </div>
      <input 
        type="file" 
        className="hidden" 
        ref={inputRef} 
        accept={accept} 
        onChange={handleFileChange} 
      />
    </div>
  )
}

export default FileInput
