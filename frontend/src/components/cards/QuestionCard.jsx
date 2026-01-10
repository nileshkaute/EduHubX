import React from 'react'

const QuestionCard = ({ question, topic, difficulty, answers }) => {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-500 p-5">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{topic}</span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor[difficulty] || 'bg-gray-100 text-gray-800'}`}>
          {difficulty}
        </span>
      </div>
      <h4 className="text-md font-semibold text-gray-900 mb-4 line-clamp-2">{question}</h4>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{answers} Answers</span>
        <button className="text-blue-600 font-medium hover:underline">Solve Now</button>
      </div>
    </div>
  )
}

export default QuestionCard
