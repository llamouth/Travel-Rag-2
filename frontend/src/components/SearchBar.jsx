// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchDestinations, searchKaggleData } from '@/lib/api';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const destinationResults = await searchDestinations(query);
      const kaggleResults = await searchKaggleData(query);
      setSearchResults([...kaggleResults]);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="flex space-x-2 mb-4">
      <Input
        type="text"
        placeholder="Search destinations..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                {result.name} - {result.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;