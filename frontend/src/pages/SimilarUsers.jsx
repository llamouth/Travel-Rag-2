// src/pages/SimilarUsers.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchKaggleData } from '@/lib/api';
import { useUser } from '@/context/userContext';

function SimilarUsers() {
  const { userId } = useParams();
  const [similarUsers, setSimilarUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userPreferences } = useUser();

  useEffect(() => {
    const getSimilarUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const preferencesText = `${userPreferences.preferred_activities} ${userPreferences.vacation_budget} ${userPreferences.location} ${userPreferences.favorite_season}`;
        const query = preferencesText;

        const users = await searchKaggleData(query);
        setSimilarUsers(users);
      } catch (err) {
        console.error('Error fetching similar users:', err);
        setError(err.message || 'Failed to fetch similar users.');
      } finally {
        setLoading(false);
      }
    };

    getSimilarUsers();
  }, [userId, userPreferences]);

  if (loading) {
    return <div className="p-4 text-center">Loading similar users...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Users with Similar Preferences</h2>
      {similarUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {similarUsers.map((user, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-md transition-shadow hover:shadow-lg bg-white"
            >
              <h3 className="text-lg font-semibold mb-2">User {user.id}</h3>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Gender:</strong> {user.gender}
              </p>
              <p>
                <strong>Income:</strong> ${user.income}
              </p>
              <p>
                <strong>Education:</strong> {user.education_level}
              </p>
              <p>
                <strong>Travel Frequency:</strong> {user.travel_frequency}
              </p>
              <p>
                <strong>Preferred Activities:</strong> {user.preferred_activities}
              </p>
              <p>
                <strong>Vacation Budget:</strong> ${user.vacation_budget}
              </p>
              <p>
                <strong>Location:</strong> {user.location}
              </p>
              <p>
                <strong>Proximity to Mountains:</strong> {user.proximity_to_mountains}
              </p>
              <p>
                <strong>Proximity to Beaches:</strong> {user.proximity_to_beaches}
              </p>
              <p>
                <strong>Favorite Season:</strong> {user.favorite_season}
              </p>
              {/* Add other fields as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>No users with similar preferences found.</p>
      )}
    </div>
  );
}

export default SimilarUsers;