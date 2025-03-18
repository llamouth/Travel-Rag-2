// src/pages/Preferences.jsx
import React, { useState } from 'react';
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
import { createUserPreferences } from '@/lib/api';

function Preferences() {
    const [preferences, setPreferences] = useState({
        Preferred_Activities: '',
        Vacation_Budget: 5000,
        Location: '',
        Favorite_Season: '',
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'Vacation_Budget') {
        setPreferences({
            ...preferences,
            Vacation_Budget: parseInt(e.target.value, 10),
        });
        } else {
        setPreferences({ ...preferences, [e.target.name]: e.target.value });
        }
    };

    const handleSliderChange = (value) => {
        setPreferences({ ...preferences, Vacation_Budget: value[0] });
    };

    const handleSavePreferences = async () => {
        try {
            console.log(preferences)
            await createUserPreferences(id, preferences);
            navigate(`/dashboard?userId=${id}`);
        } catch (error) {
            console.error('Update preferences error:', error);
            alert('Failed to update preferences.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen p-4">
            <div className="w-full max-w-md p-6 border rounded-md">
                <h1 className="text-2xl font-bold mb-6">Set Your Travel Preferences</h1>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Preferred Activities:</label>
                    <Textarea
                        name="Preferred_Activities"
                        placeholder="swimming, hiking, sunbathing, skiing, ..."
                        value={preferences.Preferred_Activities}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Vacation Budget (0 - 10000):</label>
                    <Slider
                        defaultValue={[preferences.Vacation_Budget]}
                        max={10000}
                        step={100}
                        onValueChange={handleSliderChange}
                    />
                    <p className="mt-2 text-sm text-gray-500">Budget: ${preferences.Vacation_Budget}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Location:</label>
                    <Select
                        name="Location"
                        value={preferences.Location}
                        onValueChange={(value) => handleChange({ target: { name: 'Location', value } })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="rural">Rural</SelectItem>
                            <SelectItem value="suburban">Suburban</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Favorite Season:</label>
                    <Select
                        name="Favorite_Season"
                        value={preferences.Favorite_Season}
                        onValueChange={(value) => handleChange({ target: { name: 'Favorite_Season', value } })}
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

                <Button onClick={handleSavePreferences} className="w-full">Save Preferences</Button>
            </div>
        </div>
    );
}

export default Preferences;