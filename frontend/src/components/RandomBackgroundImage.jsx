// src/components/RandomBackgroundImage.jsx
import React, { useEffect, useState } from 'react';
import { fetchPhotosUnsplash } from '@/lib/api';
import { motion, easeInOut } from 'motion/react';

const keywords = ['nature town', 'cityscape', 'travel', 'tropical', 'snowy city'];

export default function RandomBackgroundImage() {
  const [backgrounds, setBackgrounds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 8000;

  useEffect(() => {
    const loadImages = async () => {
      const results = await Promise.all(
        keywords.map(async (keyword) => {
          try {
            const photos = await fetchPhotosUnsplash(keyword);
            return photos[0]?.urls?.full;
          } catch {
            return null;
          }
        })
      );
      setBackgrounds(results.filter(Boolean));
    };
    loadImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % backgrounds.length);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [backgrounds]);

  if (backgrounds.length === 0) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {backgrounds.map((url, i) => (
        <motion.div
          key={url}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{
            backgroundImage: `url(${url})`,
          }}
          animate={{ scale: i === currentIndex ? 1.1 : 1 }}
          transition={{ duration: intervalTime / 1000, ease: easeInOut }}
        />
      ))}
    </div>
  );
}
