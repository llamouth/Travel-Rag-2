import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'motion/react';
import { fetchDestination, fetchGeminiDetails, updateDestinationDetails, fetchPhotosUnsplash, updateDestinationImageUrl } from '../lib/api';
import AnimatedLoading from '@/components/AnimatedLoading'; // Assuming you have this component
import { Button } from '@/components/ui/button'; // Assuming you have a UI library with a Button component

function DestinationPage() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [destinationDetails, setDestinationDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(true); 
    const [errorDetails, setErrorDetails] = useState(null);

    useEffect(() => {
        async function fetchImage(destinationName) {
            try {
                const response = await fetchPhotosUnsplash(destinationName);
                if (response && response.length > 0) {
                    const unsplashImageUrl = response[0].urls.regular;
                    const unsplashImageAlt = response[0].alt_description || destinationName;

                    setImageUrl(unsplashImageUrl);
                    setImageAlt(unsplashImageAlt);

                    await updateDestinationImageUrl(id, unsplashImageUrl); // Update database with fetched image
                } else {
                    setImageUrl('/placeholder-image.jpg');
                    setImageAlt(`No image found for ${destinationName}`);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
                setImageUrl('/error-image.jpg');
                setImageAlt(`Error loading image for ${destinationName}`);
            }
        }

        const fetchDetails = async () => {
            setLoadingDetails(true);
            if (id) {
                try {
                    const destination = await fetchDestination(id);

                    if (destination && destination.destination) {
                        fetchImage(destination.destination); 
                        // Check if details exist in the database
                        if (destination?.best_times?.length) {
                            setDestinationDetails(destination);
                            setLoadingDetails(false);
                        } else {
                            // Details don't exist, fetch from Gemini API
                            const details = await fetchGeminiDetails(destination.destination);

                            if (details) {
                                // Update the database with the Gemini details
                                const newDetails = { cities: details.cities, bestTime: details.bestTime.bestTime, explanation: details.bestTime.explanation, description: details.description.description };

                                const updatedDestination = await updateDestinationDetails(id, newDetails);

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

        fetchDetails();

    }, [id]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-screen h-screen overflow-hidden flex z-0"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center h-screen w-screen transition-opacity duration-300"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>

            {/* Back Button */}
            <div className="absolute top-4 left-4 z-20">
                <Button onClick={() => navigate(-1)} className="bg-white text-black hover:bg-gray-100">
                    Go Back
                </Button>
            </div>

            {/* Semi-transparent overlay for readability of initial info */}
            <div className="absolute top-0 left-0 h-full w-1/3 bg-black opacity-50 text-white p-8 flex flex-col justify-start overflow-y-auto">
                {loadingDetails ? (
                    <div className="mt-8">
                        <AnimatedLoading />
                    </div>
                ) : errorDetails ? (
                    <p className="text-red-500">{errorDetails}</p>
                ) : destinationDetails ? (
                    <div className='flex flex-col justify-center pt-32'>
                        <h1 className="text-7xl font-bold mb-4">{destinationDetails.destination}</h1>
                        <p className="text-sm mb-6">{destinationDetails.description}</p>
                        <h2 className="font-semibold text-lg mb-2">Cities</h2>
                        {destinationDetails.cities?.slice(0, 5)?.map((cityString, index) => {
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
                        <h2 className="font-semibold text-lg mt-4 mb-2">Best Time to Visit</h2>
                        <p className="text-xs mb-1">{destinationDetails.best_times}</p>
                        <p className="text-xs">{destinationDetails.best_times_explanation}</p>
                        {/* Add other details as needed */}
                    </div>
                ) : (
                    <p className="text-sm">Loading destination info...</p>
                )}
            </div>
        </motion.div>
    );
}

export default DestinationPage;