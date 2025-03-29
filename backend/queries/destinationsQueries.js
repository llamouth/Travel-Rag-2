// queries/destinationQueries.js
const db = require('../db/dbConfig');
const generateEmbedding = require('../utils/generateEmbedding')

// Get all destinations
const getAllDestinations = async () => {
    try {
        return await db.any('SELECT * FROM destinations');
    } catch (error) {
        throw error;
    }
};

// Get destination by ID
const getDestinationById = async (id) => {
    try {
        return await db.oneOrNone('SELECT * FROM destinations WHERE id = $1', id);
    } catch (error) {
        throw error;
    }
};

// Create a new destination
const createDestination = async (trip) => {
    try {
        const {
            destination,
            startDate,
            endDate,
            durationDays,
            travelerName,
            travelerAge,
            travelerGender,
            travelerNationality,
            accommodationType,
            accommodationCost,
            transportationType,
            transportationCost
        } = trip;

        const description = `${destination}, ${accommodationType}, ${transportationType}`;
        const embedding = await generateEmbedding(description);

        return await db.one(
            'INSERT INTO destinations (destination, start_date, end_date, duration_days, traveler_name, traveler_age, traveler_gender, traveler_nationality, accommodation_type, accommodation_cost, transportation_type, transportation_cost, embedding) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
            [destination, startDate, endDate, durationDays, travelerName, travelerAge, travelerGender, travelerNationality, accommodationType, accommodationCost, transportationType, transportationCost, embedding]
        );
    } catch (error) {
        throw error;
    }
};

// Update destination
const updateDestination = async (trip) => {
    try {
        const {
            id,
            destination,
            startDate,
            endDate,
            durationDays,
            travelerName,
            travelerAge,
            travelerGender,
            travelerNationality,
            accommodationType,
            accommodationCost,
            transportationType,
            transportationCost,
            image_url,
            description
        } = trip;

        const embeddingDescription = `${destination}, ${accommodationType}, ${transportationType}`;
        const embedding = await generateEmbedding(embeddingDescription);

        return await db.oneOrNone(
            'UPDATE destinations SET destination = $2, start_date = $3, end_date = $4, duration_days = $5, traveler_name = $6, traveler_age = $7, traveler_gender = $8, traveler_nationality = $9, accommodation_type = $10, accommodation_cost = $11, transportation_type = $12, transportation_cost = $13, embedding = $14, image_url = $15 WHERE id = $1 RETURNING *',
            [id, destination, startDate, endDate, durationDays, travelerName, travelerAge, travelerGender, travelerNationality, accommodationType, accommodationCost, transportationType, transportationCost, embedding, image_url]
        );
    } catch (error) {
        throw error;
    }
};

// Delete destination
const deleteDestination = async (id) => {
    try {
        return await db.oneOrNone('DELETE FROM destinations WHERE id = $1 RETURNING *', id);
    } catch (error) {
        throw error;
    }
};

const searchDestinations = async (queryEmbedding) => {
    try {
        return await db.any(`
            SELECT id, destination, (embedding <-> $1::vector) AS distance
            FROM destinations
            ORDER BY distance ASC
            LIMIT 10;
        `, [queryEmbedding]);
    } catch (error) {
        throw error;
    }
};

const updateDestinationImageUrl = async (id, imageUrl) => {
    try {
        return await db.oneOrNone(
            'UPDATE destinations SET image_url = $2 WHERE id = $1 RETURNING *',
            [id, imageUrl]
        );
    } catch (error) {
        throw error;
    }
};

const updateDestinationDetails = async (id, details) => {
    const { cities, bestTime, explanation, description } = details
    
    try {
        return await db.oneOrNone(
            'UPDATE destinations SET description = $5, cities = $2, best_times = $3, best_times_explanation = $4 WHERE id = $1 RETURNING *',
            [id, cities, bestTime, explanation, description]
        );
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination,
    searchDestinations,
    updateDestinationImageUrl,
    updateDestinationDetails
};