import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { fetchPhotosUnsplash, updateDestinationImageUrl, fetchDestination, fetchGeminiDetails, updateDestinationDetails } from '@/lib/api'; // Import fetchDestination
import AnimatedLoading from '@/components/AnimatedLoading'; // Assuming you have this component
import { AnimatePresence } from 'motion/react';
import { useUser } from '@/context/userContext';



function DestinationCard({ recommendation }) {
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [destinationDetails, setDestinationDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(true); // Initially loading
    const [errorDetails, setErrorDetails] = useState(null);
    const { currentDestination, setCurrentDestination } = useUser();


    useEffect(() => {
        async function fetchImage() {
            try {
                if (recommendation.image_url) {
                    setImageUrl(recommendation.image_url);
                    setImageAlt(recommendation.destination);
                } else {
                    const response = await fetchPhotosUnsplash(recommendation.destination);
                    if (response && response.length > 0) {
                        const unsplashImageUrl = response[0].urls.regular;
                        const unsplashImageAlt = response[0].alt_description || recommendation.destination;

                        setImageUrl(unsplashImageUrl);
                        setImageAlt(unsplashImageAlt);

                        await updateDestinationImageUrl(recommendation.id, unsplashImageUrl);
                    } else {
                        setImageUrl('/placeholder-image.jpg');
                        setImageAlt(`No image found for ${recommendation.destination}`);
                    }
                }
            } catch (error) {
                console.error('Error fetching image:', error);
                setImageUrl('/error-image.jpg');
                setImageAlt(`Error loading image for ${recommendation.destination}`);
            }
        }
        
        const fetchDetails = async () => {
            setLoadingDetails(true);
            if (recommendation?.id) {
                try {
                    const destination = await fetchDestination(recommendation.id);

                    if (destination && destination.destination) {
                        // Check if details exist in the database
                        if (destination?.best_times?.length) {
                            setDestinationDetails(destination);
                            setLoadingDetails(false);
                        } else {
                            // Details don't exist, fetch from Gemini API
                            const details = await fetchGeminiDetails(destination.destination);
                            

                            if (details) {
                                // Update the database with the Gemini details
                                const newDetails = { cities: details.cities, bestTime: details.bestTime.bestTime, explanation: details.bestTime.explanation, description: details.description.description }
                                
                                const updatedDestination = await updateDestinationDetails(recommendation.id, newDetails);
                                

                                setDestinationDetails(updatedDestination);
                                setLoadingDetails(false);
                            } else {
                                setErrorDetails('Failed to fetch destination details.');
                                setLoadingDetails(false);
                            }
                        }
                    } else {
                        setErrorDetails('Destination not found.');
                        setLoadingDetails(false);
                    }
                } catch (err) {
                    setErrorDetails(err);
                    setLoadingDetails(false);
                }
            } else {
                setLoadingDetails(false);
                setErrorDetails('No destination ID provided.');
            }
        };

        fetchImage();
        
        fetchDetails();
        
    }, [recommendation.destination, recommendation.image_url, recommendation.id, currentDestination]);

    return (
        <motion.div
            initial={{ borderRadius: '10px' }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer w-screen h-screen overflow-hidden rounded-lg border-4 flex"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 h-screen w-screen"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>

            {/* Semi-transparent overlay for readability of initial info */}
            <div className="absolute top-0 left-0 h-full w-1/3 bg-black opacity-50 text-white p-4 flex flex-col justify-center">
                <h2 className="text-7xl font-bold mb-2 opacity-100">{recommendation.destination}</h2>

                {loadingDetails ? (
                    <div className="absolute top-28">
                        <AnimatedLoading />
                    </div>
                ) : errorDetails ? (
                    <p className="text-red-500">{errorDetails}</p>
                ) : destinationDetails ? (
                    <div>
                        <p className="text-sm mb-4">{recommendation.category}</p>
                        <p className="mb-4 text-sm">{destinationDetails.description}</p>
                        <h3 className="font-semibold text-sm mb-2">Cities</h3>
                        {destinationDetails.cities?.slice(0, 3)?.map((cityString, index) => {
                            try {
                                const cityObject = JSON.parse(cityString);
                                return (
                                    <p key={index} className="text-xs mb-1">{cityObject.city}</p>
                                );
                            } catch (parseError) {
                                console.error("Error parsing city string:", cityString, parseError);
                                return (
                                    <p key={index} className="text-xs mb-1">Invalid City Data</p>
                                );
                            }
                        })}
                        <h3 className="font-semibold text-sm mt-2 mb-1">Best Time</h3>
                        <p className="text-xs mb-1">{destinationDetails.best_times}</p>
                        <p className="text-xs">{destinationDetails.best_times_explanation?.slice(0, 100)}...</p>
                        {/* Add other details as needed */}
                    </div>
                ) : (
                    <p className="text-sm">{recommendation.category}</p>
                )}
            </div>
        </motion.div>
    );
}

export default DestinationCard;