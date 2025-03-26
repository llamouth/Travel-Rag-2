import React, { useState } from 'react';
import DestinationCard from './DestinationCard';
import { Button } from '@/components/ui/button';

function Carousel({ recommendations }) {
    console.log(recommendations)
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + recommendations.length) % recommendations.length);
    };

    return (
        <div className="relative flex items-center justify-center w-full">
            <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="absolute left-4 z-10 bg-white/50 rounded-full"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 10-1.06-1.06l-3 3z"
                        clipRule="evenodd"
                    />
                </svg>
            </Button>
            <div className="flex items-center justify-center w-full">
                <div className="w-1/4 relative">
                    {recommendations.length > 0 && (
                        <DestinationCard
                            recommendation={recommendations[(currentIndex - 1 + recommendations.length) % recommendations.length]}
                            key={(currentIndex - 1 + recommendations.length) % recommendations.length}
                            className="h-[400px]" // Adjust height as needed
                        />
                    )}
                </div>
                <div className="w-1/2 relative z-10">
                    {recommendations.length > 0 && (
                        <DestinationCard
                            recommendation={recommendations[currentIndex]}
                            key={currentIndex}
                            className="h-[450px]" // Adjust height as needed
                        />
                    )}
                </div>
                <div className="w-1/4 relative">
                    {recommendations.length > 0 && (
                        <DestinationCard
                            recommendation={recommendations[(currentIndex + 1) % recommendations.length]}
                            key={(currentIndex + 1) % recommendations.length}
                            className="h-[400px]" // Adjust height as needed
                        />
                    )}
                </div>
            </div>
            <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="absolute right-4 z-10 bg-white/50 rounded-full"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72h-5.69a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                        clipRule="evenodd"
                    />
                </svg>
            </Button>
        </div>
    );
}

export default Carousel;