// src/components/RecommendationList.jsx
import React from 'react';
import DestinationCard from './DestinationCard';

function RecommendationList({ recommendations }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recommendations.map((recommendation) => (
        <DestinationCard key={recommendation.name} recommendation={recommendation} />
      ))}
    </div>
  );
}

export default RecommendationList;