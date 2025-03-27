import React, { useState, useEffect } from 'react';
import Carousel from '@/components/Carousel';
import { fetchRecommendations } from '@/lib/api';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/userContext'; 

function Dashboard() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('userId');
    const { preferences } = useUser(); 
    const [preferenceUpdate, setPreferenceUpdate] = useState(0); 

    useEffect(() => {
        if (id || preferences) {
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
    }, [id, preferenceUpdate]); 

    useEffect(() => {
        if (preferences) {
            setPreferenceUpdate((prev) => prev + 1); 
        }
    }, [preferences]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message || error}</div>;
    }

    return (
        <div className="p-6 flex flex-col items-center w-full max-w-screen-lg mx-auto space-y-8">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold">Your Recommendations</h1>
                <Link to={`/preferences/${id}`}>
                    <Button className="px-6 py-3">Edit Preferences</Button>
                </Link>
            </div>
            <div className="w-full">
                <Carousel recommendations={recommendations} />
            </div>
        </div>
    );
}

export default Dashboard;