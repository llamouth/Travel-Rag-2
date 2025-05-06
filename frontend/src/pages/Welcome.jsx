import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
    const token = localStorage.getItem('token');

    return (
        <div className="p-4 flex flex-col items-center justify-center min-h-screen  text-white">
            <h1 className="text-7xl font-bold mb-6">Welcome to Entirary</h1>
            <p className="mb-6 text-center text-lg max-w-md">
                Explore personalized travel recommendations based on your preferences. 
                Join us and start your journey today!
            </p>
            <div className="flex space-x-4">
                {!token ? (
                    <>
                        <Link to="/login">
                            <Button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 transition-colors rounded-md">
                                Log In
                            </Button>
                        </Link>
                        <Link to="/sign-up">
                            <Button className="px-8 py-4 bg-neutral-600 hover:bg-neutral-500 transition-colors rounded-md">
                                Sign Up
                            </Button>
                        </Link>
                    </>
                ) : (
                    <p className="text-xl">Welcome back! Enjoy exploring.</p>
                )}
            </div>
        </div>
    );
}

export default Welcome;
