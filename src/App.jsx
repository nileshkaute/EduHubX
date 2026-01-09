import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="bg-gray-50 min-h-screen">
        {/* Your content here */}
        <button 
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="m-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isLoggedIn ? 'Logout' : 'Login'} (for testing)
        </button>
      </main>
    </div>
  )
}

export default App