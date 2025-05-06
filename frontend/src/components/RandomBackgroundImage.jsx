// src/components/RandomBackgroundImage.jsx
import React, { useState, useEffect } from 'react';
import { fetchPhotosUnsplash } from '@/lib/api'; // Assuming your fetch function is in this path

function RandomBackgroundImage() {
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keywords] = useState(['nature', 'cityscape', 'abstract', 'travel', 'tropical', 'cold']); // Array of keywords to fetch images for
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [intervalTime, setIntervalTime] = useState(10000); // Time in milliseconds (e.g., 10 seconds)

  useEffect(() => {
    const loadBackground = async (keyword) => {
      setLoading(true);
      setError(null);
      try {
        const photos = await fetchPhotosUnsplash(keyword);
        if (photos && photos.length > 0 && photos[0].urls && photos[0].urls.full) {
          setBackgroundUrl(photos[0].urls.full);
        } else {
          console.warn(`No image found for keyword: ${keyword}`);
          // If no image, try the next keyword
          setCurrentKeywordIndex((prevIndex) => (prevIndex + 1) % keywords.length);
        }
      } catch (err) {
        console.error('Error loading background image:', err);
        setError('Failed to load background image.');
      } finally {
        setLoading(false);
      }
    };

    loadBackground(keywords[currentKeywordIndex]);

    const intervalId = setInterval(() => {
      setCurrentKeywordIndex((prevIndex) => (prevIndex + 1) % keywords.length);
    }, intervalTime);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [keywords, currentKeywordIndex, intervalTime]);

//   useEffect(() => {
//     // Load a new background whenever the keyword index changes (after the interval)
//     if (!loading && !error) {
//       loadBackground(keywords[currentKeywordIndex]);
//     }
//   }, [currentKeywordIndex, keywords, loading, error]);

  if (loading) {
    return <div className="fixed top-0 left-0 w-full h-full bg-gray-100 animate-pulse z-0"></div>; // Loading placeholder, ensure it's behind other content
  }

  if (error) {
    return <div className="fixed top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center text-red-500 z-0">{error}</div>;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 z-0"
      style={{ backgroundImage: `url(${backgroundUrl})`, opacity: backgroundUrl ? 1 : 0 }}
    ></div>
  );
}

export default RandomBackgroundImage;