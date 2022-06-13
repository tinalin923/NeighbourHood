import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './components/contexts/AuthContext.js';
import { EditContextProvider } from './components/contexts/EditContext.js';
import PrivateRoute from './components/PrivateRoute.js';
import EachPresent from './pages/EachPresent.js';
import Editing from './pages/Editing.js';
import Landing from './pages/Landing.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Total from './pages/Total.js';
import './styles/scss/main.scss';

const App = () => (
  <Router>
    <EditContextProvider>
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
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="total" element={<Total />} />
          <Route path="total/:villageId" element={<EachPresent />} />
          <Route path="*" element={<p>There is nothing here: 404!</p>} />
        </Routes>
      </AuthContextProvider>
    </EditContextProvider>
  </Router>
);

export default App;
