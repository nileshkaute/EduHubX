import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'
import SearchResults from '../components/search/SearchResults'
import NoteCard from '../components/cards/NoteCard'
import RoadmapCard from '../components/cards/RoadmapCard'
import QuestionCard from '../components/cards/QuestionCard'
import { Star, Map, MessageSquare, ArrowRight } from 'lucide-react'
import { fetchNotes } from '../services/noteApi'

const Home = () => {
  const { query } = useContext(SearchContext)
  const [topNotes, setTopNotes] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetchNotes()
        // For "Top Rated", we'll just take the first 3 for now
        setTopNotes(response.data.slice(0, 3))
      } catch (error) {
        console.error('Error fetching notes:', error)
      } finally {
        setIsLoading(false)
      }
    }
    getNotes()
  }, [])

  const topRoadmaps = [
    { id: 1, title: 'Frontend Developer', description: 'Step by step guide to become a modern frontend developer.', steps: 12, colorFrom: 'from-pink-500', colorTo: 'to-rose-500' },
    { id: 2, title: 'Backend Developer', description: 'Complete roadmap to master server-side programming.', steps: 15, colorFrom: 'from-blue-500', colorTo: 'to-cyan-500' },
  ]

  const recentQuestions = [
    { id: 1, question: 'What is the difference between useMemo and useCallback?', topic: 'React', difficulty: 'Medium', answers: 12 },
    { id: 2, question: 'Explain Event Loop in JavaScript.', topic: 'JavaScript', difficulty: 'Hard', answers: 25 },
    { id: 3, question: 'What are ACID properties in Database?', topic: 'DBMS', difficulty: 'Easy', answers: 8 },
    { id: 4, question: 'How does CSS Grid differ from Flexbox?', topic: 'CSS', difficulty: 'Medium', answers: 15 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {query ? (
        <SearchResults />
      ) : (
        <div className="space-y-12">
          {/* Welcome Header */}
          <section className="text-center py-12 px-4">
             <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
               Master Your <span className="text-blue-600">Studies</span>
             </h1>
             <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
               Access top-tier notes, comprehensive roadmaps, and practice questions to ace your exams.
             </p>
          </section>

          {/* Top Notes Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <h2 className="text-2xl font-bold text-gray-800">Top Rated Notes</h2>
              </div>
              <button className="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors group text-sm">
                View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topNotes.map(note => (
                <NoteCard key={note.id} {...note} />
              ))}
            </div>
          </section>

          {/* Roadmaps Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Map className="w-6 h-6 text-pink-500" />
                <h2 className="text-2xl font-bold text-gray-800">Learning Roadmaps</h2>
              </div>
              <button className="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors group text-sm">
                View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topRoadmaps.map(roadmap => (
                <RoadmapCard key={roadmap.id} {...roadmap} />
              ))}
            </div>
          </section>

          {/* Practice Questions Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-800">Recent Questions</h2>
              </div>
              <button className="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors group text-sm">
                View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {recentQuestions.map(question => (
                <QuestionCard key={question.id} {...question} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default Home
