// queries/geminiQueries.js
const gemini = require('../utils/geminiAi');



const cleanGeminiResponse = (response) => {
    // Remove leading non-JSON characters
    const jsonStart = response.indexOf('[');
    const objectStart = response.indexOf('{');
    const start = jsonStart !== -1 ? (objectStart !== -1 ? Math.min(jsonStart, objectStart) : jsonStart) : objectStart;
    if (start !== -1) {
        response = response.substring(start);
    }

    // Remove trailing non-JSON characters
    let end = response.lastIndexOf(']');
    if (end === -1) {
        end = response.lastIndexOf('}');
    }
    if (end !== -1) {
        response = response.substring(0, end + 1);
    }

    return response.trim();
};


const getCities = async (destination) => {
    try {
        const prompt = `
            Provide a JSON array of cities to visit in ${destination}. 
            The JSON array should have the following format:
            [
                { "city": "City Name" },
                { "city": "Another City Name" },
                ...
            ]
        `;
        const result = await gemini(prompt);
        const cleanedResult = cleanGeminiResponse(result); // Clean response
        try {
            return JSON.parse(cleanedResult); // Attempt to parse the JSON response
        } catch (parseError) {
            console.error('Error parsing Gemini response for cities:', parseError);
            throw new Error(`Invalid JSON response from Gemini: ${result}`);
        }
    } catch (error) {
        console.error('Error querying Gemini for cities:', error);
        throw error;
    }
};

const getDescription = async (destination) => {
    try {
        const prompt = `
            Provide a JSON object containing a short description of ${destination}.
            The JSON object should have the following format:
            { "description": "Short Description of ${destination}" }
        `;
        const result = await gemini(prompt);
        const cleanedResult = cleanGeminiResponse(result); // Clean response
        try {
            return JSON.parse(cleanedResult);
        } catch (parseError) {
            console.error('Error parsing Gemini response for description:', parseError);
            throw new Error(`Invalid JSON response from Gemini: ${result}`);
        }
    } catch (error) {
        console.error('Error querying Gemini for description:', error);
        throw error;
    }
};

const getBestTimeToVisit = async (destination) => {
    try {
        const prompt = `
            Provide a JSON object containing the best time to visit ${destination} and a brief explanation.
            The JSON object should have the following format:
            { "bestTime": "Best Time to Visit", "explanation": "Brief Explanation" }
        `;
        const result = await gemini(prompt);
        const cleanedResult = cleanGeminiResponse(result); // Clean response
        try {
            return JSON.parse(cleanedResult);
        } catch (parseError) {
            console.error('Error parsing Gemini response for best time:', parseError);
            throw new Error(`Invalid JSON response from Gemini: ${result}`);
        }
    } catch (error) {
        console.error('Error querying Gemini for best time to visit:', error);
        throw error;
    }
};

const getDestinationDetails = async (destination) => {
    try {
        const cities = await getCities(destination);
        const description = await getDescription(destination);
        const bestTime = await getBestTimeToVisit(destination);

        return {
            cities,
            description,
            bestTime,
        };
    } catch (error) {
        console.error('Error getting destination details:', error);
        throw error;
    }
};

module.exports = {
    getCities,
    getDescription,
    getBestTimeToVisit,
    getDestinationDetails
};