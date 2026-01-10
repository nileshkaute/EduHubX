import React from 'react'
import NoteForm from '../components/forms/NoteForm'

const AddNote = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Share Your Knowledge</h1>
        <p className="mt-2 text-gray-600">Upload your study notes and help the community grow.</p>
      </div>
      
      <NoteForm />
    </div>
  )
}

export default AddNote
