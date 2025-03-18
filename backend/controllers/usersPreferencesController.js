const { getAllUserPreferences, createUserPreferences, updateUserPreferences, deleteUserPreferences, getUserPreferencesById, searchUserPreferences: searchUserPreferencesQuery } = require('../queries/usersPreferencesQueries');
const generateEmbedding  = require('../utils/generateEmbedding');

// Get all user preferences
const allUserPreferences = async (req, res) => {
    try {
        const userPreferences = await getAllUserPreferences();
        res.status(200).json(userPreferences);
    } catch (error) {
        console.error('Error getting all user preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get user preferences by ID
const userPreferencesById = async (req, res) => {
    try {
        const { id } = req.params;
        const userPreferences = await getUserPreferencesById(id);
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
const newUserPreferences = async (req, res) => {
    try {
        const { user_id } = req.params
        const { preferences } = req.body;
        const newUserPreferences = await createUserPreferences(user_id, preferences);
        res.status(201).json({ userPreferences: newUserPreferences });
    } catch (error) {
        console.error('Error creating user preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user preferences
const updatedUserPreferences = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, preferences } = req.body;
        const newUserPreferences = await updateUserPreferences(id, user_id, preferences);
        if (newUserPreferences) {
            res.status(200).json({ message: 'User preferences updated successfully', userPreferences: newUserPreferences });
        } else {
            res.status(404).json({ error: 'User preferences not found' });
        }
    } catch (error) {
        console.error('Error updating user preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete user preferences
const deletedUserPreferences = async (req, res) => {
    try {
        const { id } = req.params;
        const removedUserPreferences = await deleteUserPreferences(id);
        if (removedUserPreferences) {
            res.status(200).json({ message: 'User preferences deleted successfully' });
        } else {
            res.status(404).json({ error: 'User preferences not found' });
        }
    } catch (error) {
        console.error('Error deleting user preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const searchUserPreferences = async (req, res) => {
    try {
        const { query } = req.body;
        const queryEmbedding = await generateEmbedding(query);
        const results = await searchUserPreferencesQuery(queryEmbedding);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error searching user preferences')
    }
}


module.exports = {
    allUserPreferences,
    userPreferencesById,
    newUserPreferences,
    updatedUserPreferences,
    deletedUserPreferences,
    searchUserPreferences
};