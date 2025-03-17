// controllers/userRecommendationsController.js
const {
    getAllUserRecommendations: getAllUserRecommendationsQuery,
    getUserRecommendationsById: getUserRecommendationsByIdQuery,
    getUserRecommendationsByUserId: getUserRecommendationsByUserIdQuery,
    createUserRecommendation: createUserRecommendationQuery,
    deleteUserRecommendation: deleteUserRecommendationQuery,
} = require('../queries/userRecommendationsQueries');
  
// Get all user recommendations
const getAllUserRecommendations = async (req, res) => {
    try {
      const recommendations = await getAllUserRecommendationsQuery();
      res.status(200).json(recommendations);
    } catch (error) {
      console.error('Error getting all user recommendations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
// Get user recommendations by ID
const getUserRecommendationsById = async (req, res) => {
    try {
      const { id } = req.params;
      const recommendation = await getUserRecommendationsByIdQuery(id);
      if (recommendation) {
        res.status(200).json(recommendation);
      } else {
        res.status(404).json({ error: 'User recommendation not found' });
      }
    } catch (error) {
      console.error('Error getting user recommendation by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
// Get user recommendations by user ID
const getUserRecommendationsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const recommendations = await getUserRecommendationsByUserIdQuery(userId);
      res.status(200).json(recommendations);
    } catch (error) {
      console.error('Error getting user recommendations by user ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
  // Create user recommendation
const createUserRecommendation = async (req, res) => {
    try {
      const { user_id, destination_id } = req.body;
      const newRecommendation = await createUserRecommendationQuery(user_id, destination_id);
      res.status(201).json({ message: 'User recommendation created successfully', recommendation: newRecommendation });
    } catch (error) {
      console.error('Error creating user recommendation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
  // Delete user recommendation
const deleteUserRecommendation = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRecommendation = await deleteUserRecommendationQuery(id);
      if (deletedRecommendation) {
        res.status(200).json({ message: 'User recommendation deleted successfully' });
      } else {
        res.status(404).json({ error: 'User recommendation not found' });
      }
    } catch (error) {
      console.error('Error deleting user recommendation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
module.exports = {
    getAllUserRecommendations,
    getUserRecommendationsById,
    getUserRecommendationsByUserId,
    createUserRecommendation,
    deleteUserRecommendation,
};