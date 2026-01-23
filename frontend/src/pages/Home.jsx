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
    <div className="min-h-screen">
      {query ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchResults />
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Full Width Hero Section */}
          <section 
            className="w-full relative bg-stone-900 pt-20 pb-0 overflow-hidden"
            style={{
              backgroundImage: "url('/hero-bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-stone-900/60 mix-blend-multiply"></div>
            
            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-32">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg mb-6 leading-tight">
                Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-lime-300">Studies</span>
              </h1>
              <p className="text-xl md:text-2xl text-stone-100 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
                Access top-tier notes, comprehensive roadmaps, and practice questions to ace your exams.
              </p>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[100px] text-stone-50 fill-current">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
              </svg>
            </div>
          </section>

          {/* Main Content (Stone Background) */}
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 py-12 space-y-20">
            
            {/* Top Notes Section */}
            <section>
              <div className="flex justify-between items-center mb-8 px-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Star className="w-6 h-6 text-amber-600 fill-current" />
                  </div>
                  <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Top Rated Notes</h2>
                </div>
                <button className="flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-800 transition-colors group text-sm py-2 px-4 rounded-full bg-emerald-50 hover:bg-emerald-100">
                  View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <div className="flex flex-wrap gap-6 justify-start">
                {topNotes.map(note => (
                  <div key={note.id} className="w-full sm:w-auto sm:flex-1 md:flex-none md:w-60 lg:w-64">
                    <NoteCard {...note} />
                  </div>
                ))}
              </div>
            </section>

            {/* Roadmaps Section */}
            <section>
              <div className="flex justify-between items-center mb-8 px-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <Map className="w-6 h-6 text-rose-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Learning Roadmaps</h2>
                </div>
                <button className="flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-800 transition-colors group text-sm py-2 px-4 rounded-full bg-emerald-50 hover:bg-emerald-100">
                  View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <div className="flex flex-wrap gap-6 justify-start">
                {topRoadmaps.map(roadmap => (
                   <div key={roadmap.id} className="w-full sm:w-auto sm:flex-1 md:flex-none md:w-60 lg:w-64">
                    <RoadmapCard {...roadmap} />
                  </div>
                ))}
              </div>
            </section>

            {/* Practice Questions Section */}
            <section>
              <div className="flex justify-between items-center mb-8 px-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-sky-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Recent Questions</h2>
                </div>
                <button className="flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-800 transition-colors group text-sm py-2 px-4 rounded-full bg-emerald-50 hover:bg-emerald-100">
                  View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <div className="flex flex-wrap gap-6 justify-start">
                {recentQuestions.map(question => (
                   <div key={question.id} className="w-full sm:w-auto sm:flex-1 md:flex-none md:w-60 lg:w-64">
                    <QuestionCard {...question} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
