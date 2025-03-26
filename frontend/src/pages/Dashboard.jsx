import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Carousel from '@/components/Carousel';
import { fetchRecommendations } from '@/lib/api';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Dashboard() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('userId');

    useEffect(() => {
        if (id) {
            setLoading(true);
            setError(null);
            fetchRecommendations(id)
                .then((data) => {
                    setRecommendations(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
            setError('User ID not found.');
        }
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message || error}</div>;
    }

    return (
        <div className="p-6 flex flex-col items-center w-full max-w-screen-lg mx-auto space-y-8">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold">Your Travel Dashboard</h1>
                <Link to={`/preferences/${id}`}>
                    <Button className="px-6 py-3">Edit Preferences</Button>
                </Link>
            </div>
            <SearchBar className="w-full max-w-md" /> {/* Limit search bar width */}
            <div className="w-full"> {/* Carousel container to take full width */}
                <Carousel recommendations={recommendations} />
            </div>
        </div>
    );
}

export default Dashboard;