import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ element: Component, ...rest }) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/login" replace /> // Redirect to login if not authenticated
        )
      }
    />
  );
}

export default ProtectedRoute;
