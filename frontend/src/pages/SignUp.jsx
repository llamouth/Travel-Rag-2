// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '@/lib/api';

function SignUp({setIsLoggedIn}) {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    profile_picture: '',
    bio: '',
    first_name: '',
    last_name: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser(user);
      setIsLoggedIn(true);
      setUser(newUser.user)
      localStorage.setItem('token', newUser.token);
      localStorage.setItem('userId', newUser.user.id);
      navigate(`/preferences/${newUser.user.id}`);
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="profile_picture" className="sr-only">Profile Picture URL</label>
              <input
                id="profile_picture"
                name="profile_picture"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10 sm:text-sm"
                placeholder="Profile Picture URL"
                value={user.profile_picture}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="bio" className="sr-only">Bio</label>
              <textarea
                id="bio"
                name="bio"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10 sm:text-sm"
                placeholder="Bio"
                value={user.bio}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="first_name" className="sr-only">First Name</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={user.first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="last_name" className="sr-only">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                value={user.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  ); 
}

export default SignUp;