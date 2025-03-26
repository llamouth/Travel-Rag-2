// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SearchResults from './pages/SearchResults';
import NavBar from './components/NavBar';
import Preferences from './pages/Preferences';
import SimilarUsers from './pages/SimilarUsers';
import { UserProvider} from './context/userContext'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (e.g., check for a token in local storage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <UserProvider>
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Welcome isLoggedIn={ isLoggedIn} />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}
          />
          <Route path="/similar-users/:id" element={ <SimilarUsers/> } />

          <Route path="/preferences/:id" element={<Preferences />} />
          <Route
            path="/login"
            element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Dashboard />}
          />
          <Route
            path="/sign-up"
            element={!isLoggedIn ? <SignUp setIsLoggedIn={ setIsLoggedIn } /> : <Dashboard />}
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;