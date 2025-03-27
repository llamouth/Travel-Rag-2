import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { fetchGeminiDetails } from '../lib/api';

function DestinationPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const destinationName = location.state?.recommendation?.destination; 
    const [destinationDetails, setDestinationDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            if (destinationName) {
                try {
                    const details = await fetchGeminiDetails(destinationName);
                    setDestinationDetails(details);
                    setLoading(false);
                } catch (err) {
                    setError(err);
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setError('No destination name provided.');
            }
        };

        fetchDetails();
    }, [destinationName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message || error}</div>;
    }

    if (!destinationDetails) {
        return <div>Destination not found.</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="p-8 max-w-2xl mx-auto"
        >
            <button onClick={() => navigate(-1)} className="mb-4">
                Back
            </button>
            <h1 className="text-3xl font-bold mb-4">{destinationName}</h1> 
            <p className="mb-4">{destinationDetails.description?.description}</p>
            <h2 className='font-bold text-xl'>Cities</h2>
            {destinationDetails.cities?.map((city, index) => (
                <p key={index}>{city.city}</p>
            ))}
            <h2 className='font-bold text-xl'>Best Time to Visit</h2>
            <p>{destinationDetails.bestTime?.bestTime}</p>
            <p>{destinationDetails.bestTime?.explanation}</p>
        </motion.div>
    );
}

export default DestinationPage;