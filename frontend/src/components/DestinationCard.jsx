import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchPhotosUnsplash } from '@/lib/api';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

function DestinationCard({ recommendation }) {
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
      async function fetchImage() {
          try {
              const response = await fetchPhotosUnsplash(recommendation.destination);
              if (response && response.length > 0) {
                  setImageUrl(response[0].urls.regular);
                  setImageAlt(response[0].alt_description || recommendation.name);
              } else {
                  setImageUrl('/placeholder-image.jpg');
                  setImageAlt(`No image found for ${recommendation.name}`);
              }
          } catch (error) {
              console.error('Error fetching image:', error);
              setImageUrl('/error-image.jpg');
              setImageAlt(`Error loading image for ${recommendation.name}`);
          }
      }

      fetchImage();
  }, [recommendation.name]);

  const handleCardClick = () => {
      navigate(`/destination/${recommendation.id}`, { state: { recommendation } });
  };

  return (
      <motion.div
          initial={{ borderRadius: '10px' }}
          whileTap={{ scale: 0.95 }}
          className="relative cursor-pointer w-full"
          onClick={handleCardClick}
      >
          <Card className="w-full shadow-md overflow-hidden rounded-lg">
              <div className="relative h-64">
                  <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="object-cover w-full h-full rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
              </div>
              <div className="relative p-4 text-white">
                  <CardHeader className="p-0">
                      <CardTitle className="text-lg font-semibold truncate">
                          {recommendation.name}
                      </CardTitle>
                      <CardDescription className="text-sm truncate">
                          {recommendation.category}
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 mt-2">
                      <p className="text-sm truncate">{recommendation.description}</p>
                  </CardContent>
              </div>
          </Card>
      </motion.div>
  );
}

export default DestinationCard;