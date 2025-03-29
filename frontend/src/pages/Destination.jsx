import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useParams to get ID from URL
import { motion, AnimatePresence } from 'motion/react';
import { fetchDestination, fetchGeminiDetails, updateDestinationDetails } from '../lib/api';
import AnimatedLoading from '@/components/AnimatedLoading';

function DestinationPage() {
    const { id } = useParams(); // Get the destination ID from the URL
    const navigate = useNavigate();
    const [destinationDetails, setDestinationDetails] = useState({
        cities: [],
        bestTime: "",
        explanation: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            if (id) {
                try {
                    const destination = await fetchDestination(id);

                    if (destination && destination.destination) {
                        // Check if details exist in the database
                        if (destination?.best_times?.length) {
                            setDestinationDetails(destination);
                            setLoading(false);
                        } else {
                            // Details don't exist, fetch from Gemini API
                            const details = await fetchGeminiDetails(destination.destination);
                            console.log(details)

                            if (details) {
                                // Update the database with the Gemini details
                                const newDetails = { cities: details.cities, bestTime: details.bestTime.bestTime, explanation: details.bestTime.explanation, description: details.description.description }
                                console.log(newDetails)
                                const updatedDestination = await updateDestinationDetails(id, newDetails);
                                console.log(updatedDestination)

                                setDestinationDetails(updatedDestination);
                                setLoading(false);
                            } else {
                                setError('Failed to fetch destination details.');
                                setLoading(false);
                            }
                        }
                    } else {
                        setError('Destination not found.');
                        setLoading(false);
                    }
                } catch (err) {
                    setError(err);
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setError('No destination ID provided.');
            }
        };

        fetchDetails();
        console.log(destinationDetails)
        
    }, [id]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5 },
        },
        exit: { opacity: 0, transition: { duration: 0.3 } },
    }; 

    if (loading) {
        return <AnimatedLoading />;
    }

    return (
        <AnimatePresence>
            {destinationDetails && (
                <motion.div
                    key="details"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-8 max-w-3xl mx-auto mt-10"
                >
                    <button onClick={() => navigate(-1)} className="mb-4 bg-gray-200 px-4 py-2 rounded-md cursor-pointer hover:scale-110">
                        Back
                    </button>
                    <h1 className="text-4xl font-bold mb-6">{destinationDetails.destination}</h1>
                    <p className="mb-6 text-lg">{destinationDetails.description}</p>
                    <h2 className="font-bold text-2xl mb-4">Cities</h2>
                    {destinationDetails.cities?.slice(0, 5)?.map((cityString, index) => {
                        try {
                            const cityObject = JSON.parse(cityString);
                            return (
                                <p key={index} className="mb-2">{cityObject.city}</p>
                            );
                        } catch (error) {
                            console.error("Error parsing city string:", cityString, error);
                            return (
                                <p key={index} className="mb-2">Invalid City Data</p> 
                            );
                        }
                    })}
                    <h2 className="font-bold text-2xl mt-6 mb-4">Best Time to Visit</h2>
                    <p className="mb-2">{destinationDetails.best_times}</p>
                    <p>{destinationDetails.best_times_explanation}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default DestinationPage;