import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Navbar from './components/navbar/Navbar'
import { SearchProvider } from './context/SearchContext'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Notes from './pages/Notes'
import AddNote from './pages/AddNote'
import Login from './pages/Login'
import Signup from './pages/Signup'

import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <GoogleOAuthProvider clientId="523746386708-b5rs3ihb87e7g5qlgvb9hlh99mev96bn.apps.googleusercontent.com">
      <AuthProvider>
        <SearchProvider>
          <Router>
            <div className="bg-gray-50 min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route 
                    path="/add-note" 
                    element={
                      <ProtectedRoute>
                        <AddNote />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </main>
            </div>
          </Router>
        </SearchProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App