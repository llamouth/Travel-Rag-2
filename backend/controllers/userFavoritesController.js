const {
    getAllUserFavorites: getAllUserFavoritesQuery,
    getUserFavoritesById: getUserFavoritesByIdQuery,
    getUserFavoritesByUserId: getUserFavoritesByUserIdQuery,
    createUserFavorite: createUserFavoriteQuery,
    deleteUserFavorite: deleteUserFavoriteQuery,
} = require('../queries/userFavoritesQueries');
  
// Get all user favorites
const getAllUserFavorites = async (req, res) => {
    try {
      const favorites = await getAllUserFavoritesQuery();
      res.status(200).json(favorites);
    } catch (error) {
      console.error('Error getting all user favorites:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
// Get user favorite by ID
const getUserFavoritesById = async (req, res) => {
    try {
      const { id } = req.params;
      const favorite = await getUserFavoritesByIdQuery(id);
      if (favorite) {
        res.status(200).json(favorite);
      } else {
        res.status(404).json({ error: 'User favorite not found' });
      }
    } catch (error) {
      console.error('Error getting user favorite by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
// Get user favorites by user ID
const getUserFavoritesByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const favorites = await getUserFavoritesByUserIdQuery(userId);
      res.status(200).json(favorites);
    } catch (error) {
      console.error('Error getting user favorites by user ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
// Create user favorite
const createUserFavorite = async (req, res) => {
    try {
      const newFavorite = await createUserFavoriteQuery(req.body);
      res.status(201).json({ message: 'User favorite created successfully', favorite: newFavorite });
    } catch (error) {
      console.error('Error creating user favorite:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
// Delete user favorite
const deleteUserFavorite = async (req, res) => {
    try {
      const deletedFavorite = await deleteUserFavoriteQuery(req.body);
      if (deletedFavorite) {
        res.status(200).json({ message: 'User favorite deleted successfully' });
      } else {
        res.status(404).json({ error: 'User favorite not found' });
      }
    } catch (error) {
      console.error('Error deleting user favorite:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
module.exports = {
    getAllUserFavorites,
    getUserFavoritesById,
    getUserFavoritesByUserId,
    createUserFavorite,
    deleteUserFavorite,
};