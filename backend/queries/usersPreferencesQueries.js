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
        const {user_id, preferred_activities, vacation_budget, location, favorite_season, start_date, end_date, duration_days, accommodation_type, transportation_type, traveler_age, traveler_gender, traveler_nationality, pets, environmental_concerns, travel_frequency, income, education_level } = user;

        const preferencesText = `${preferred_activities} ${vacation_budget} ${location} ${favorite_season} ${start_date} ${end_date} ${accommodation_type} ${transportation_type}`;
        const embedding = await generateEmbedding(preferencesText);

        return await db.one(
            'INSERT INTO user_preferences (user_id, preferred_activities, vacation_budget, location, favorite_season, start_date, end_date, duration_days, accommodation_type, transportation_type, traveler_age, traveler_gender, traveler_nationality, pets, environmental_concerns, travel_frequency, income, education_level, embedding) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *',
            [ user_id, preferred_activities, vacation_budget, location, favorite_season, start_date, end_date, duration_days, accommodation_type, transportation_type, traveler_age, traveler_gender, traveler_nationality, pets, environmental_concerns, travel_frequency, income, education_level, embedding ]
        );
    } catch (error) {
        throw error;
    }
};

// Update user preferences
const updateUserPreferences = async (user) => {
    try {
        const { user_id, preferred_activities, vacation_budget, location, favorite_season, start_date, end_date, duration_days, accommodation_type, transportation_type, traveler_age, traveler_gender, traveler_nationality, pets, environmental_concerns, travel_frequency, income, education_level, embedding } = user;

        return await db.oneOrNone(
            'UPDATE user_preferences SET preferred_activities = $2, vacation_budget = $3, location = $4, favorite_season = $5, start_date = $6, end_date = $7, duration_days = $8, accommodation_type = $9, transportation_type = $10, traveler_age = $11, traveler_gender = $12, traveler_nationality = $13, pets = $14, environmental_concerns = $15, travel_frequency = $16, income = $17, education_level = $18, embedding = $19 WHERE user_id = $1 RETURNING *',
            [ user_id, preferred_activities, vacation_budget, location, favorite_season, start_date, end_date, duration_days, accommodation_type, transportation_type, traveler_age, traveler_gender, traveler_nationality, pets, environmental_concerns, travel_frequency, income, education_level, embedding ]
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