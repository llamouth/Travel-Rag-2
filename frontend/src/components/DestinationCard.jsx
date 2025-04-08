import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { fetchPhotosUnsplash, updateDestinationImageUrl } from '@/lib/api'; // Import the new function

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
        navigate(`/destination/${recommendation.id}`, { state: { recommendation } });
    };

    return (
        <motion.div
            initial={{ borderRadius: '10px' }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer w-full h-64 overflow-hidden rounded-lg border-4"
            onClick={handleCardClick}
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%'
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <h2 className="text-2xl font-bold mb-2">{recommendation.destination}</h2>
                <p className="text-sm">{recommendation.category}</p>
            </div>
        </motion.div>
    );
}

export default DestinationCard;