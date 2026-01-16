import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-gray-50">Checking permissions...</div>
  }

  console.log('AdminRoute: current user role is', currentUser?.role);

  // If not logged in or not admin, redirect to home
  if (!currentUser || currentUser.role?.toLowerCase() !== 'admin') {
    console.warn('Access denied to admin route. Current role:', currentUser?.role);
    return <Navigate to="/" />
  }

  return children
}

export default AdminRoute
