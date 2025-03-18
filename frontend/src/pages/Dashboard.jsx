// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecommendationList from '../components/RecommendationList';
import { fetchRecommendations } from '@/lib/api';
import { useSearchParams } from 'react-router-dom';

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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message || error}</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Travel Dashboard</h1>
            <SearchBar />
            <RecommendationList recommendations={recommendations} />
        </div>
    );
}

export default Dashboard;