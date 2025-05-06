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
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      if (preferences?.travel_style?.length) {
        setLocalPreferences(preferences);
      }
    };
    fetchUser();
  }, [id, preferences]);

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
    <div className="flex flex-col items-center p-6 pt-28"> 
      <Card className="w-full h-full max-w-screen-md  bg-white/70 backdrop-blur-md"> 
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Set Your Travel Preferences</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-auto">
          <div>
            <Label htmlFor="preferred_activities" className="block text-sm font-medium mb-2">
              Preferred Activities:
            </Label>
            <Textarea
              id="preferred_activities"
              name="preferred_activities"
              placeholder="swimming, hiking, sunbathing, skiing, ..."
              value={localPreferences.preferred_activities}
              onChange={handleChange}
              className="w-full h-24 rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-500"
            />
          </div>

          <div>
            <Label htmlFor="travel_style" className="block text-sm font-medium mb-2">
              Travel Style:
            </Label>
            <Textarea
              id="travel_style"
              name="travel_style"
              placeholder="Luxury, Adventure, Budget,..."
              value={localPreferences.travel_style}
              onChange={handleChange}
              className="w-full h-24 rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-500"
            />
          </div>

          <div>
            <Label htmlFor="interests" className="block text-sm font-medium mb-2">
              Interests:
            </Label>
            <Textarea
              id="interests"
              name="interests"
              placeholder="History, Food, Art,..."
              value={localPreferences.interests}
              onChange={handleChange}
              className="w-full h-24 rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-500" 
            />
          </div>

          <div>
            <Label htmlFor="specific_keywords" className="block text-sm font-medium mb-2">
              Specific Keywords:
            </Label>
            <Textarea
              id="specific_keywords"
              name="specific_keywords"
              placeholder="Beach, Mountains, City,..."
              value={localPreferences.specific_keywords}
              onChange={handleChange}
              className="w-full h-24 rounded-md border px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-500"
            />
          </div>

          <div className="col-span-full">
            <Label htmlFor="budget" className="block text-sm font-medium mb-2">
              Vacation Budget (0 - 10000):
            </Label>
            <Slider
              id="budget"
              defaultValue={[parseInt(localPreferences.budget, 10)]}
              max={10000}
              step={100}
              onValueChange={handleSliderChange}
            />
            <p className="mt-2 text-sm text-gray-500">Budget: ${localPreferences.budget}</p>
          </div>

          <div>
            <Label htmlFor="preferred_season" className="block text-sm font-medium mb-2">
              Preferred Season:
            </Label>
            <Select
              id="preferred_season"
              name="preferred_season"
              value={localPreferences.preferred_season}
              onValueChange={(value) => handleChange({ target: { name: 'preferred_season', value } })}
            >
              <SelectTrigger className="w-full rounded-md border px-3 py-2 bg-white text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-500">
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

          <div>
            <Label htmlFor="location_type" className="block text-sm font-medium mb-2">
              Location Type:
            </Label>
            <Select
              id="location_type"
              name="location_type"
              value={localPreferences.location_type}
              onValueChange={(value) => handleChange({ target: { name: 'location_type', value } })}
            >
              <SelectTrigger className="w-full rounded-md border px-3 py-2 bg-white text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-500">
                <SelectValue placeholder="Select Location Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rural">Rural</SelectItem>
                <SelectItem value="suburban">Suburban</SelectItem>
                <SelectItem value="urban">Urban</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="accommodation_type" className="block text-sm font-medium mb-2">
              Accommodation Type:
            </Label>
            <Select
              id="accommodation_type"
              name="accommodation_type"
              value={localPreferences.accommodation_type}
              onValueChange={(value) => handleChange({ target: { name: 'accommodation_type', value } })}
            >
              <SelectTrigger className="w-full rounded-md border px-3 py-2 bg-white text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-500">
                <SelectValue placeholder="Select Accommodation Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="airbnb">Airbnb</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="transportation_type" className="block text-sm font-medium mb-2">
              Transportation Type:
            </Label>
            <Select
              id="transportation_type"
              name="transportation_type"
              value={localPreferences.transportation_type}
              onValueChange={(value) => handleChange({ target: { name: 'transportation_type', value } })}
            >
              <SelectTrigger className="w-full rounded-md border px-3 py-2 bg-white text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary-500">
                <SelectValue placeholder="Select Transportation Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plane">Plane</SelectItem>
                <SelectItem value="train">Train</SelectItem>
                <SelectItem value="car">Car</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSavePreferences} className="w-full col-span-full mt-4">
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Preferences;