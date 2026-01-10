import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import { SearchProvider } from './context/SearchContext'
import Home from './pages/Home'
import Notes from './pages/Notes'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <SearchProvider>
      <Router>
        <div className="bg-gray-50 min-h-screen flex flex-col">
          <Navbar isLoggedIn={isLoggedIn} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<Notes />} />
            </Routes>
          </main>
          
          <div className="fixed bottom-4 right-4 z-50">
             <button 
               onClick={() => setIsLoggedIn(!isLoggedIn)}
               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
             >
               {isLoggedIn ? 'Logout' : 'Login'} (Test)
             </button>
          </div>
        </div>
      </Router>
    </SearchProvider>
  )
}

export default App