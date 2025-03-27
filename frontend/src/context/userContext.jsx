// src/context/UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchRecommendations, getUserPreferences, fetchUser } from '@/lib/api'; // Import your API functions
import { useParams } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const  userId  = localStorage.getItem('userId');
  const [userData, setUserData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [preferences, setPreferences] = useState({
    preferred_activities: '',
    travel_style: '',
    interests: '',
    specific_keywords: '',
    budget: '', 
    preferred_season: '', 
    location_type: '', 
    accommodation_type: '',
    transportation_type: '',
  })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch user preferences
        const preferences = await getUserPreferences(userId);
        setPreferences(preferences);

        // Fetch recommendations
        if (preferences?.travel_style?.length) {
          const recs = await fetchRecommendations(userId);
          setRecommendations(recs);
        }

        // Fetch user data (you'll need to create this function in api.js)
        const user = await fetchUser(userId);
        setUserData(user);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message || 'Failed to fetch user data.');
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const contextValue = {
    userData,
    recommendations,
    preferences,
    loading,
    error,
    setUserData, 
    setRecommendations, 
    setPreferences, 
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};