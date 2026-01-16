import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer'
import { SearchProvider } from './context/SearchContext'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Notes from './pages/Notes'
import NoteDetails from './pages/NoteDetails'
import AddNote from './pages/AddNote'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import MyNotes from './pages/MyNotes'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'

import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import AdminLayout from './components/AdminLayout'
import UserLayout from './components/UserLayout'

const App = () => {
  return (
    <GoogleOAuthProvider clientId="523746386708-b5rs3ihb87e7g5qlgvb9hlh99mev96bn.apps.googleusercontent.com">
      <AuthProvider>
        <SearchProvider>
          <Router>
            <Routes>
              {/* Admin Routes - Standalone Layout */}
              <Route 
                path="/admin/*" 
                element={
                  <AdminRoute>
                    <AdminLayout>
                      <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        {/* More admin routes can go here */}
                      </Routes>
                    </AdminLayout>
                  </AdminRoute>
                } 
              />

              {/* Public & User Routes - Shared Website Layout */}
              <Route 
                path="/*" 
                element={
                  <UserLayout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/notes" element={<Notes />} />
                      <Route path="/notes/:id" element={<NoteDetails />} />
                      <Route 
                        path="/add-note" 
                        element={
                          <ProtectedRoute>
                            <AddNote />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/my-notes" 
                        element={
                          <ProtectedRoute>
                            <MyNotes />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/profile" 
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                    </Routes>
                  </UserLayout>
                } 
              />
            </Routes>
          </Router>
        </SearchProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App