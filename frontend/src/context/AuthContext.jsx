import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to maintain user session
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check expiry
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setCurrentUser(null);
        } else {
          // Ideally fetch fresh user data from backend, but using stored/decoded info for now
          // We can store user info in localStorage too relative to the token
          const storedUser = JSON.parse(localStorage.getItem('user'));
          setCurrentUser(storedUser);
        }
      } catch (error) {
        localStorage.removeItem('token');
        setCurrentUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setCurrentUser(data);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const signup = async (email, password) => {
    try {
      // Assuming 'Name' is part of signup form (we might need to update Signup.jsx to include name)
      // For now defaulting name to email prefix
      const name = email.split('@')[0];
      const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setCurrentUser(data);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  };

  const googleLogin = async (credentialResponse) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/google', { 
        token: credentialResponse.credential 
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setCurrentUser(data);
      return data;
    } catch (error) {
       throw new Error(error.response?.data?.message || 'Google Login failed');
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put('http://localhost:5000/api/auth/profile', profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.setItem('user', JSON.stringify(data));
      setCurrentUser(data);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  }

  const value = {
    currentUser,
    login,
    signup,
    googleLogin,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
