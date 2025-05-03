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
        <div className="relative h-screen">
            <DestinationCard recommendation={currentRecommendation} />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center gap-4">
                <Button variant="outline" onClick={handlePrev} className="px-4 py-2">
                    Prev
                </Button>
                <Button variant="outline" onClick={handleNext} className="px-4 py-2">
                    Next
                </Button>
            </div>
        </div>
    );
}

export default DestinationView;