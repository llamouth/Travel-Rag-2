// routes/userFavoritesRoutes.js
const { Router } = require('express');
const {
  getAllUserFavorites,
  getUserFavoriteByUserIdAndDestinationId,
  getUserFavoritesByUserId,
  createUserFavorite,
  deleteUserFavorite,
} = require('../controllers/userFavoritesController');

const router = Router();

// Get all user favorites
router.get('/', getAllUserFavorites);

// Get user favorite by ID
router.get('/:id', getUserFavoriteByUserIdAndDestinationId);

// Get user favorites by user ID
router.get('/user/:userId', getUserFavoritesByUserId);

// Create user favorite
router.post('/', createUserFavorite);

// Delete user favorite
router.delete('/', deleteUserFavorite);

module.exports = router;