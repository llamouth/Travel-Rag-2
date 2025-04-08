// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/context/userContext';

function Login({ onLogin }) {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser((prevState) => ({ ...prevState, username: e.target.value }))}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser((prevState) => ({ ...prevState, password: e.target.value }))}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;