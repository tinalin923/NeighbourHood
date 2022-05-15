import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from './contexts/AuthContext.js';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { currentUid } = useAuthState();
  return currentUid ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
