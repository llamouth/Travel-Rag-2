import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchDestinations } from '@/lib/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SearchBar() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query) {
                try {
                    const results = await searchDestinations(query);
                    setSearchResults(results);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error('Search error:', error);
                }
            } else {
                setSearchResults([]);
                setShowSuggestions(false);
            }
        };

        const delayDebounce = setTimeout(() => {
            fetchSuggestions();
        }, 300); // 300ms delay
        return () => clearTimeout(delayDebounce);
    }, [query]);

  const handleResultClick = (result) => {
        navigate(`/destination/${result.id}`, { state: { recommendation: { destination: result.destination } } });
        setQuery('');
        setSearchResults([]);
        setShowSuggestions(false);
    };

    return (
        <div className="relative w-full z-10"> 
            <div className="flex items-center space-x-2 w-full selection:bg-amber-500">
                <Input
                    type="text"
                    placeholder="Search destinations..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-grow rounded-md"
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                <Button onClick={() => handleResultClick(searchResults[0])} className="rounded-md">Search</Button>
            </div>
            {showSuggestions && searchResults.length > 0 && (
                <div className="mt-2 w-full bg-white rounded-md shadow-md p-2 absolute top-full left-0 text-black">
                    <ul className="list-none p-0 m-0">
                        {searchResults.map((result) => (
                            <li
                                key={result.id}
                                className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                                onClick={() => handleResultClick(result)}
                            >
                                {result.destination}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchBar;