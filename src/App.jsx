import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { SearchProvider } from './context/SearchContext'
import Home from './pages/Home'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <SearchProvider>
      <div>
        <Navbar isLoggedIn={isLoggedIn} />
        <main className="bg-gray-50 min-h-screen">
          <Home />
          <button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="m-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isLoggedIn ? 'Logout' : 'Login'} (for testing)
          </button>
        </main>
      </div>
    </SearchProvider>
  )
}

export default App