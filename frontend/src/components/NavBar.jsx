// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ isLoggedIn, onLogout }) {
  
  const id = localStorage.getItem('userId');




  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-semibold">
        Entirary
      </Link>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Link to={`/dashboard?userId=${id}`}>Dashboard</Link>
            <Link to={`/similar-users/${id}`}>Similar Users</Link>
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