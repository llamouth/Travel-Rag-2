// routes/userPreferencesRoutes.js
const express = require('express');
const {
    allUserPreferences,
    userPreferencesById,
    newUserPreferences,
    updatedUserPreferences,
    deletedUserPreferences,
} = require('../controllers/usersPreferencesController');

const router = express.Router();

// Get all user preferences
router.get('/', allUserPreferences);

// Get user preferences by ID
router.get('/:id', userPreferencesById);

// Create user preferences
router.post('/', newUserPreferences);

// Update user preferences
router.put('/:id', updatedUserPreferences);

// Delete user preferences
router.delete('/:id', deletedUserPreferences);

module.exports = router;