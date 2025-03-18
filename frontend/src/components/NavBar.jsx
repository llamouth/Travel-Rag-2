// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ isLoggedIn, onLogout }) {
  console.log('NavBar isLoggedIn:', isLoggedIn); // Add console log
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-semibold">
        Travel Recommendations
      </Link>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/search">Search</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/sign-up">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;