// routes/userPreferencesRoutes.js
const express = require('express');
const userPreferencesController = require('../controllers/usersPreferencesController');

const router = express.Router();

// Get all user preferences
router.get('/', userPreferencesController.getAllUserPreferences);

// Get user preferences by ID
router.get('/:id', userPreferencesController.getUserPreferencesById);

// Create user preferences
router.post('/', userPreferencesController.createUserPreferences);

// Update user preferences
router.put('/:id', userPreferencesController.updateUserPreferences);

// Delete user preferences
router.delete('/:id', userPreferencesController.deleteUserPreferences);

module.exports = router;