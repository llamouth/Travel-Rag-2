import React, { useState } from 'react';
import DestinationCard from './DestinationCard';
import { Button } from '@/components/ui/button';

function DestinationView({ recommendations }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + recommendations.length) % recommendations.length);
    };

    if (!recommendations || recommendations.length === 0) {
        return <div>No recommendations available.</div>;
    }

    const currentRecommendation = recommendations[currentIndex];

    return (
        <div className="relative flex flex-col items-center justify-center w-full p-4">
            <div className="w-full max-w-lg">
                <DestinationCard recommendation={currentRecommendation} />
            </div>
            <div className="mt-4 flex justify-center gap-4">
                <Button variant="outline" onClick={handlePrev}>
                    Previous
                </Button>
                <Button variant="outline" onClick={handleNext}>
                    Next
                </Button>
            </div>
        </div>
    );
}

export default DestinationView;