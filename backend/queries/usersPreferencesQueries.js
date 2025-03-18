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
        return await db.oneOrNone('SELECT * FROM user_preferences WHERE id = $1', id);
    } catch (error) {
        throw error;
    }
};

// Create user preferences
const createUserPreferences = async (user_id, preferences) => {
    try {
        const { preferred_activities, vacation_budget, location, favorite_season} = preferences;

        const preferencesText = `${preferred_activities} ${vacation_budget} ${location} ${favorite_season}`;

        const preferences_embedding = await generateEmbedding(preferencesText);

        return await db.one(
            'INSERT INTO user_preferences (user_id, preferred_activities, vacation_budget, location, favorite_season, preferences_embedding) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, preferred_activities, vacation_budget, location, favorite_season, preferences_embedding]
        );
    } catch (error) {
        throw error;
    }
};

// Update user preferences
const updateUserPreferences = async (id, user_id, preferences) => {
    try {
        return await db.oneOrNone(
            'UPDATE user_preferences SET user_id = $2, preferences = $3 WHERE id = $1 RETURNING *',
            [id, user_id, preferences]
        );
    } catch (error) {
        throw error;
    }
};

// Delete user preferences
const deleteUserPreferences = async (id) => {
    try {
        return await db.oneOrNone('DELETE FROM user_preferences WHERE id = $1 RETURNING *', id);
    } catch (error) {
        throw error;
    }
};

const searchUserPreferences = async (queryEmbedding) => {
    try {
        return await db.any(`
            SELECT * , (embedding <-> $1::vector) AS distance
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