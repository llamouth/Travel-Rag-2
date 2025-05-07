// queries/userFavoritesQueries.js
const db = require('../db/dbConfig');

// Get all user favorites
const getAllUserFavorites = async () => {
    try {
        return await db.any('SELECT * FROM user_favorites');
    } catch (error) {
        throw error;
    }
};

// Get user favorite by ID
const getUserFavoritesById = async (id) => {
    try {
        return await db.oneOrNone('SELECT * FROM user_favorites WHERE id = $1', id);
    } catch (error) {
        throw error;
    }
};

// Get user favorites by user ID
const getUserFavoritesByUserId = async (userId) => {
    try {
        return await db.any('SELECT * FROM user_favorites WHERE user_id = $1', userId);
    } catch (error) {
        throw error;
    }
};

// Create user favorite
const createUserFavorite = async (user) => {
    try {
        const {user_id, destination_id} = user
        return await db.one('INSERT INTO user_favorites (user_id, destination_id) VALUES ($1, $2) RETURNING *',
            [user_id, destination_id]
        );
    } catch (error) {
        throw error;
    }
};

// Delete user favorite
const deleteUserFavorite = async (user) => {
    try {
        const {user_id, destination_id} = user
        return await db.oneOrNone(
            'DELETE FROM user_favorites WHERE user_id = $1 AND destination_id = $2 RETURNING *',
            [user_id, destination_id]
        );
    } catch (error) {
        throw error;
    }
};


module.exports = {
  getAllUserFavorites,
  getUserFavoritesById,
  getUserFavoritesByUserId,
  createUserFavorite,
  deleteUserFavorite,
};