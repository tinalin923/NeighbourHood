import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuthState } from './contexts/AuthContext.js';

const PrivateRoute = ({ children }) => {
  const { currentUid } = useAuthState();
  return currentUid ? children : <Navigate to="/login" replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
