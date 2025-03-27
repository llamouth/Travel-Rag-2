// queries/userPreferencesQueries.js
const db = require('../db/dbConfig');
const generateEmbedding = require('../utils/generateEmbedding');


// Get all user preferences
const getAllUserPreferences = async () => {
    try {
        return await db.any('SELECT * FROM user_preferences');
    } catch (error) {
        throw error;
    }
};

// Get user preferences by ID
const getUserPreferencesById = async (id) => {
    try {
        return await db.oneOrNone('SELECT * FROM user_preferences WHERE user_id = $1', id);
    } catch (error) {
        throw error;
    }
};

// Create user preferences
const createUserPreferences = async (user) => {
    try {
        const { id, preferred_activities, travel_style, interests, specific_keywords, budget, preferred_season, location_type, accommodation_type, transportation_type } = user;

        const preferencesText = `${preferred_activities} ${travel_style} ${interests} ${specific_keywords} ${budget} ${preferred_season} ${location_type} ${accommodation_type} ${transportation_type}`;
        const embedding = await generateEmbedding(preferencesText);

        return await db.one(
            'INSERT INTO user_preferences (user_id, preferred_activities, travel_style, interests, specific_keywords, budget, preferred_season, location_type, accommodation_type, transportation_type, embedding) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [ id, preferred_activities, travel_style, interests, specific_keywords, budget, preferred_season, location_type, accommodation_type, transportation_type, embedding ]
        );
    } catch (error) {
        throw error;
    }
};

// Update user preferences
const updateUserPreferences = async (user) => {
    try {
        const { id, preferred_activities, travel_style, interests, specific_keywords, budget, preferred_season, location_type, accommodation_type, transportation_type} = user;


        const preferencesText = `${preferred_activities} ${travel_style} ${interests} ${specific_keywords} ${budget} ${preferred_season} ${location_type} ${accommodation_type} ${transportation_type}`;
        const newEmbedding = await generateEmbedding(preferencesText);

        return await db.oneOrNone(
            'UPDATE user_preferences SET preferred_activities = $2, travel_style = $3, interests = $4, specific_keywords = $5, budget = $6, preferred_season = $7, location_type = $8, accommodation_type = $9, transportation_type = $10, embedding = $11 WHERE user_id = $1 RETURNING *',
            [ id, preferred_activities, travel_style, interests, specific_keywords, budget, preferred_season, location_type, accommodation_type, transportation_type, newEmbedding ]
        );
    } catch (error) {
        throw error;
    }
};

// Delete user preferences
const deleteUserPreferences = async (id) => {
    try {
        return await db.oneOrNone('DELETE FROM user_preferences WHERE user_id = $1 RETURNING *', id);
    } catch (error) {
        throw error;
    }
};

const searchUserPreferences = async (queryEmbedding) => {
    try {
        return await db.any(`
            SELECT *, (embedding <-> $1::vector) AS distance
            FROM user_preferences
            ORDER BY distance ASC
            LIMIT 10;
        `, [queryEmbedding]);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUserPreferences,
    getUserPreferencesById,
    createUserPreferences,
    updateUserPreferences,
    deleteUserPreferences,
    searchUserPreferences
};