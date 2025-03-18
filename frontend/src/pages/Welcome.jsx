// src/pages/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to Travel Recommendations</h1>
            <p className="mb-4">Explore personalized travel recommendations based on your preferences.</p>
            <div className="flex space-x-4">
                <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">Log In</Link>
                <Link to="/sign-up" className="bg-green-500 text-white px-4 py-2 rounded-md">Sign Up</Link>
            </div>
        </div>
    );
}

export default Welcome;