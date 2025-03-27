// src/pages/Welcome.jsx
import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {

    const token = localStorage.getItem('token');

    return (
        <div className="p-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to Entirary</h1>
            <p className="mb-4">Explore personalized travel recommendations based on your preferences.</p>
            <div className="flex space-x-4">
                {!token && <>
                    <Link to="/login" className="">
                        <Button className='p-4 hover:cursor-pointer'>Log In</Button>
                    </Link>
                    <Link to="/sign-up" className="">
                        <Button className='p-4 bg-neutral-600 hover:cursor-pointer'>Sign Up</Button>
                    </Link>
                </>}
            </div>
        </div>
    );
}

export default Welcome;