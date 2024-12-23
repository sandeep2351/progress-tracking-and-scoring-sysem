import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated, userRole }) => {
  // Check if the user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If route is for admin, check if user is admin
  if (userRole === 'admin' && window.location.pathname === '/admin') {
    return children;
  }

  // If route is for candidate, check if user is candidate
  if (userRole === 'candidate' && window.location.pathname === '/candidate') {
    return children;
  }

  // Redirect user to the appropriate dashboard if their role doesn't match the route
  return <Navigate to={userRole === 'admin' ? '/admin' : '/candidate'} />;
};

export default PrivateRoute;
