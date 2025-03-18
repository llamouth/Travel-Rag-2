// src/pages/SearchResults.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';

function SearchResults() {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((result) => (
            <DestinationCard key={result.name} recommendation={result} />
          ))}
        </div>
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
}

export default SearchResults;