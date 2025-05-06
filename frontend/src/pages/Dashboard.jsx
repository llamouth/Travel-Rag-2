import React, { useState, useEffect } from 'react';
import DestinationView from '@/components/DestinationView';
import DestinationCard from '@/components/DestinationCard';
import { fetchRecommendations } from '@/lib/api';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/userContext'; 
import AnimatedLoading from '@/components/AnimatedLoading';

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
        return <AnimatedLoading />;
    }


    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message || error}</div>;
    }

    return (
        <div className="flex flex-col  h-screen">
            <DestinationView recommendations={recommendations} />
        </div>
    );
}

export default Dashboard;