// src/PrivateRoute.jsx (You can place this in your components or context folder)

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust path if AuthContext.jsx is in a different location
import { FiLoader } from 'react-icons/fi';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Show a loading state while Firebase Auth is checking the user's status
  if (loading) {
    return (
      <div className="min-h-screen bg-[#22333B] flex flex-col justify-center items-center text-white">
        <FiLoader className="animate-spin text-4xl mb-4" />
        <p>Checking authentication status...</p>
      </div>
    );
  }

  // If the user is authenticated (currentUser is not null), render the Dashboard
  if (currentUser) {
    return children;
  }

  // If the user is not authenticated, redirect to the login page
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;