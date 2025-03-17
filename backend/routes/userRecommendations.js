// routes/userRecommendationsRoutes.js
const { Router } = require('express');
const {
  getAllUserRecommendations,
  getUserRecommendationsById,
  createUserRecommendation,
  deleteUserRecommendation,
} = require('../controllers/userRecommendationsController');

const router = Router();

// Get all user recommendations
router.get('/', getAllUserRecommendations);

// Get user recommendations by ID
router.get('/:id', getUserRecommendationsById);

// Create user recommendation
router.post('/', createUserRecommendation);

// Delete user recommendation
router.delete('/:id', deleteUserRecommendation);

module.exports = router;