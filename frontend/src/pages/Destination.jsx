import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

function DestinationPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const recommendation = location.state?.recommendation;

    if (!recommendation) {
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
            <h1 className="text-3xl font-bold mb-4">{recommendation.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{recommendation.category}</p>
            <p className="mb-4">{recommendation.description}</p>
            {/* Display image and other details */}
        </motion.div>
    );
}

export default DestinationPage;