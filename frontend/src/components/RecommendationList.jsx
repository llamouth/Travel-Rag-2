import React from 'react';
import DestinationCard from './DestinationCard';

function RecommendationList({ recommendations }) {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6 text-center">Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((recommendation, i) => (
                    <DestinationCard key={i + 1} recommendation={recommendation} />
                ))}
            </div>
        </div>
    );
}

export default RecommendationList;