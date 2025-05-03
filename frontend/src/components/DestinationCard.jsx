import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { fetchPhotosUnsplash, updateDestinationImageUrl } from '@/lib/api'; // Ensure this path is correct

function DestinationCard({ recommendation }) {
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const navigate = useNavigate();

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

        fetchImage();
    }, [recommendation.destination, recommendation.image_url, recommendation.id]);

    const handleCardClick = () => {
        console.log('Card clicked:', recommendation);
        navigate(`/destination/${recommendation.id}`, { state: { recommendation } });
    };

    return (
        <motion.div
            initial={{ borderRadius: '10px' }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer w-full h-64 overflow-hidden rounded-lg border-4 flex" // Added flex to position the modal
            onClick={handleCardClick}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
                style={{ backgroundImage: `url(${imageUrl})`, opacity: 0.8 }} // Slightly dimmed background
            ></div>

            {/* Overlay for a subtle darkening effect */}
            <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-300"></div>

            {/* Side Modal */}
            <div className="absolute top-0 left-0 h-full w-1/3 bg-black bg-opacity-60 text-white p-4 flex flex-col justify-center">
                <h2 className="text-xl font-bold mb-2">{recommendation.destination}</h2>
                <p className="text-sm">{recommendation.category}</p>
                {/* You can add more details here if needed */}
            </div>
        </motion.div>
    );
}

export default DestinationCard;