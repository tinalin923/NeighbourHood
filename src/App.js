import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './components/contexts/AuthContext.js';
import PrivateRoute from './components/PrivateRoute.js';
import Editing from './pages/Editing.js';
import Landing from './pages/Landing.js';
import Login from './pages/Login.js';
import Preview from './pages/Preview.js';
import Signup from './pages/Signup.js';
import './styles/style.scss';

const App = () => (
  <Router>
    <AuthContextProvider>
      <Routes>
        <Route index element={<Landing />} />
        <Route
          path="editing"
          element={
            <PrivateRoute>
              <Editing />
            </PrivateRoute>
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
