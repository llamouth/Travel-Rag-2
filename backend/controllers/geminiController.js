// controllers/geminiController.js
const geminiQueries = require('../queries/geminiQueries');

const getCities = async (req, res) => {
    try {
        const { destination } = req.params;
        const cities = await geminiQueries.getCities(destination);
        res.json(cities);
    } catch (error) {
        console.error('Error getting cities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getDescription = async (req, res) => {
    try {
        const { destination } = req.params;
        const description = await geminiQueries.getDescription(destination);
        res.json( description );
    } catch (error) {
        console.error('Error getting description:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getBestTimeToVisit = async (req, res) => {
    try {
        const { destination } = req.params;
        const bestTime = await geminiQueries.getBestTimeToVisit(destination);
        res.json( bestTime );
    } catch (error) {
        console.error('Error getting best time to visit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getDestinationDetails = async (req, res) => {
    try {
        const { destination } = req.params;
        const details = await geminiQueries.getDestinationDetails(destination);
        res.json(details);
    } catch (error) {
        console.error('Error getting destination details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getCities,
    getDescription,
    getBestTimeToVisit,
    getDestinationDetails
};