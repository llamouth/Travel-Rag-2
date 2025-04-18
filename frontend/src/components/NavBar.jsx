import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function NavBar({ isLoggedIn, onLogout }) {
    const id = localStorage.getItem('userId');

    return (
        <nav className="bg-transparent p-4 text-white flex justify-between items-center fixed w-screen">
            <Link to="/" className="text-lg font-semibold">
                Entirary
            </Link>
            <div className="flex items-center space-x-4 flex-grow justify-center"> {/* Center the search bar */}
                <div className="max-w-md w-full"> {/* Container for search bar with max width */}
                    <SearchBar />
                </div>
            </div>
            {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                    <Link to={`/dashboard?userId=${id}`} className="hover:text-gray-300 transition-colors duration-200">
                        Dashboard
                    </Link>
                    <button
                        onClick={onLogout}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="flex items-center space-x-4">
                    <Link to="/login" className="hover:text-gray-300 transition-colors duration-200">
                        Login
                    </Link>
                    <Link to="/sign-up" className="hover:text-gray-300 transition-colors duration-200">
                        Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default NavBar;