import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { createUserPreferences, updateUserPreferences } from '@/lib/api';
import { useUser } from '@/context/userContext';

function Preferences() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { preferences, setPreferences } = useUser();

  const [localPreferences, setLocalPreferences] = useState({
    preferred_activities: '',
    travel_style: '',
    interests: '',
    specific_keywords: '',
    budget: '5000',
    preferred_season: '',
    location_type: '',
    accommodation_type: '',
    transportation_type: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (preferences?.travel_style.length) {
        setLocalPreferences(preferences);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setLocalPreferences({ ...localPreferences, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (value) => {
    setLocalPreferences({ ...localPreferences, budget: String(value[0]) });
  };

  const handleSavePreferences = async () => {
    try {
      if (preferences?.travel_style?.length && !preferences.error) {
        await updateUserPreferences(id, localPreferences);
      } else {
        await createUserPreferences(id, localPreferences);
      }
      setPreferences(localPreferences);
      navigate(`/dashboard?userId=${id}`);
    } catch (error) {
      console.error('Preferences save error:', error);
      alert('Failed to save preferences.');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 text-white">
      <div className="w-full h-full p-6  rounded-md"> {/* Increased max width */}
        <h1 className="text-2xl font-bold mb-6">Set Your Travel Preferences</h1>

        <div className="flex flex-wrap -mx-2 gap-y-10"> {/* Flex wrap container */}

          <div className="w-full md:w-1/2 px-2 mb-4 "> {/* Half width on medium screens and above */}
            <label className="block text-sm font-medium text-gray-700">Preferred Activities:</label>
            <Textarea
              name="preferred_activities"
              placeholder="swimming, hiking, sunbathing, skiing, ..."
              value={localPreferences.preferred_activities}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Travel Style:</label>
            <Textarea
              name="travel_style"
              placeholder="Luxury, Adventure, Budget,..."
              value={localPreferences.travel_style}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Interests:</label>
            <Textarea
              name="interests"
              placeholder="History, Food, Art,..."
              value={localPreferences.interests}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Specific Keywords:</label>
            <Textarea
              name="specific_keywords"
              placeholder="Beach, Mountains, City,..."
              value={localPreferences.specific_keywords}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="w-full px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Vacation Budget (0 - 10000):</label>
            <Slider
              defaultValue={[parseInt(localPreferences.budget, 10)]}
              max={10000}
              step={100}
              onValueChange={handleSliderChange}
            />
            <p className="mt-2 text-sm text-gray-500">Budget: ${localPreferences.budget}</p>
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Preferred Season:</label>
            <Select
              name="preferred_season"
              value={localPreferences.preferred_season}
              onValueChange={(value) => handleChange({ target: { name: 'preferred_season', value } })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fall">Fall</SelectItem>
                <SelectItem value="winter">Winter</SelectItem>
                <SelectItem value="spring">Spring</SelectItem>
                <SelectItem value="summer">Summer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Location Type:</label>
            <Select
              name="location_type"
              value={localPreferences.location_type}
              onValueChange={(value) => handleChange({ target: { name: 'location_type', value } })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Location Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rural">Rural</SelectItem>
                <SelectItem value="suburban">Suburban</SelectItem>
                <SelectItem value="urban">Urban</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-sm font-medium text-gray-700">Accommodation Type:</label>
            <Select
              name="accommodation_type"
              value={localPreferences.accommodation_type}
              onValueChange={(value) => handleChange({ target: { name: 'accommodation_type', value } })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Accommodation Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="airbnb">Airbnb</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/2 px-2 mb-6">
            <label className="block text-sm font-medium text-gray-700">Transportation Type:</label>
            <Select
              name="transportation_type"
              value={localPreferences.transportation_type}
              onValueChange={(value) => handleChange({ target: { name: 'transportation_type', value } })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Transportation Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plane">Plane</SelectItem>
                <SelectItem value="train">Train</SelectItem>
                <SelectItem value="car">Car</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleSavePreferences} className="w-full">Save Preferences</Button>
      </div>
    </div>
  );
}

export default Preferences;