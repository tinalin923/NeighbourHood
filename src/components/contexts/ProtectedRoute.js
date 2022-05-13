import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from './AuthContext.js';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ childern }) => {
  const { currentUser } = useAuthState();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return childern;
};

export default ProtectedRoute;
