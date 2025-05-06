import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/context/userContext';
import { Eye, EyeOff } from 'lucide-react'; // Import Eye and EyeOff from lucide-react

function Login({ onLogin }) {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setUserData } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await loginUser(user);
      setUserData(response.user);
      localStorage.setItem('token', response.token);
      onLogin(response.token);
      localStorage.setItem('userId', response.user.id);
      navigate(`/dashboard?userId=${response.user.id}`);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid username or password.'); // Set error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white">
      <Card className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-md p-10 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Log In</CardTitle>
          <CardDescription className="text-center text-lg">Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser((prevState) => ({ ...prevState, username: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => setUser((prevState) => ({ ...prevState, password: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} {/* Use Eye and EyeOff from lucide-react */}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full py-3 transition-colors rounded-md">
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
