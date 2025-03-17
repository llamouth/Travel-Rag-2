// queries/userRecommendationsQueries.js
const db = require('../db/dbConfig');

// Get all user recommendations
const getAllUserRecommendations = async () => {
  try {
    return await db.any('SELECT * FROM user_recommendations');
  } catch (error) {
    throw error;
  }
};

// Get user recommendations by ID
const getUserRecommendationsById = async (id) => {
  try {
    return await db.oneOrNone('SELECT * FROM user_recommendations WHERE id = $1', id);
  } catch (error) {
    throw error;
  }
};

// Get user recommendations by user ID
const getUserRecommendationsByUserId = async (userId) => {
  try {
    return await db.any('SELECT * FROM user_recommendations WHERE user_id = $1', userId);
  } catch (error) {
    throw error;
  }
};

// Create user recommendation
const createUserRecommendation = async (user_id, destination_id) => {
  try {
    return await db.one(
      'INSERT INTO user_recommendations (user_id, destination_id) VALUES ($1, $2) RETURNING *',
      [user_id, destination_id]
    );
  } catch (error) {
    throw error;
  }
};

// Delete user recommendation
const deleteUserRecommendation = async (id) => {
  try {
    return await db.oneOrNone('DELETE FROM user_recommendations WHERE id = $1 RETURNING *', id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUserRecommendations,
  getUserRecommendationsById,
  getUserRecommendationsByUserId,
  createUserRecommendation,
  deleteUserRecommendation,
};