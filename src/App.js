import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Landing from './pages/Landing.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Editing from './pages/Editing.js';
import Preview from './pages/Preview.js';
import {
  AuthContextProvider,
  useAuthState,
} from './components/contexts/AuthContext.js';

import './styles/style.scss';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ childern }) => {
  const { currentUser } = useAuthState();
  if (!currentUser) return <Navigate to="/login" replace />;
  return childern;
};

const App = () => (
  <Router>
    <AuthContextProvider>
      <Routes>
        <Route index element={<Landing />} />
        <Route
          path="editing"
          element={
            <ProtectedRoute>
              <Editing />
            </ProtectedRoute>
          }
        />
        <Route path="preview" element={<Preview />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<p>There is nothing here: 404!</p>} />
      </Routes>
    </AuthContextProvider>
  </Router>
);

export default App;
