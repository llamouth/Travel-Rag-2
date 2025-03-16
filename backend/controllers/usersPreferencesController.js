// controllers/userPreferencesController.js
const userPreferencesQueries = require('../queries/usersPreferencesQueries');

// Get all user preferences
const getAllUserPreferences = async (req, res) => {
    try {
        const userPreferences = await userPreferencesQueries.getAllUserPreferences();
        res.status(200).json(userPreferences);
    } catch (error) {
        console.error('Error getting all user preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get user preferences by ID
const getUserPreferencesById = async (req, res) => {
    try {
        const { id } = req.params;
        const userPreferences = await userPreferencesQueries.getUserPreferencesById(id);
        if (userPreferences) {
            res.status(200).json(userPreferences);
        } else {
            res.status(404).json({ error: 'User preferences not found' });
        }
    } catch (error) {
        console.error('Error getting user preferences by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create user preferences
const createUserPreferences = async (req, res) => {
    try {
        const { user_id, preferences } = req.body;
        const newUserPreferences = await userPreferencesQueries.createUserPreferences(user_id, preferences);
        res.status(201).json({ message: 'User preferences created successfully', userPreferences: newUserPreferences });
    } catch (error) {
        console.error('Error creating user preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user preferences
const updateUserPreferences = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, preferences } = req.body;
        const updatedUserPreferences = await userPreferencesQueries.updateUserPreferences(id, user_id, preferences);
        if (updatedUserPreferences) {
            res.status(200).json({ message: 'User preferences updated successfully', userPreferences: updatedUserPreferences });
        } else {
            res.status(404).json({ error: 'User preferences not found' });
        }
    } catch (error) {
        console.error('Error updating user preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete user preferences
const deleteUserPreferences = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUserPreferences = await userPreferencesQueries.deleteUserPreferences(id);
        if (deletedUserPreferences) {
            res.status(200).json({ message: 'User preferences deleted successfully' });
        } else {
            res.status(404).json({ error: 'User preferences not found' });
        }
    } catch (error) {
        console.error('Error deleting user preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllUserPreferences,
    getUserPreferencesById,
    createUserPreferences,
    updateUserPreferences,
    deleteUserPreferences,
};