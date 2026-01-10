import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import { SearchProvider } from './context/SearchContext'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Notes from './pages/Notes'
import AddNote from './pages/AddNote'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <div className="bg-gray-50 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/add-note" element={<AddNote />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
          </div>
        </Router>
      </SearchProvider>
    </AuthProvider>
  )
}

export default App